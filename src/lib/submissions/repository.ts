import 'server-only'
import { getSql } from '@/lib/db'
import type { ProjectAnswers } from '@/lib/submissions/domain'

export type SubmissionPeriod = {
  id: string
  startedAt: string
  scheduledEndAt: string | null
  closedAt: string | null
  effectiveClosedAt: string | null
  isOpen: boolean
}

export type StoredSubmission = ProjectAnswers & {
  id: string
  periodId: string
  reviewStatus: 'to-review' | 'reviewed'
  submittedAt: string
  deleteAfter: string
}

type PeriodRow = {
  id: string
  started_at: string
  scheduled_end_at: string | null
  closed_at: string | null
  effective_closed_at: string | null
  is_open: boolean
}

type SubmissionRow = {
  id: string
  period_id: string
  project_type: ProjectAnswers['projectType']
  sector: ProjectAnswers['sector']
  project_stage: ProjectAnswers['projectStage']
  start_preference: ProjectAnswers['startPreference']
  desired_start_date: string | null
  horizon: ProjectAnswers['horizon']
  budget_mode: ProjectAnswers['budgetMode']
  budget_min: number | null
  budget_max: number | null
  email: string | null
  phone: string | null
  linkedin_url: string | null
  review_status: 'to-review' | 'reviewed'
  submitted_at: string
  delete_after: string
}

function asRows<T>(value: unknown) {
  return value as T[]
}

function mapPeriod(row: PeriodRow): SubmissionPeriod {
  return {
    id: row.id,
    startedAt: row.started_at,
    scheduledEndAt: row.scheduled_end_at,
    closedAt: row.closed_at,
    effectiveClosedAt: row.effective_closed_at,
    isOpen: row.is_open,
  }
}

function mapSubmission(row: SubmissionRow): StoredSubmission {
  return {
    id: row.id,
    periodId: row.period_id,
    projectType: row.project_type,
    sector: row.sector,
    projectStage: row.project_stage,
    startPreference: row.start_preference,
    desiredStartDate: row.desired_start_date ?? undefined,
    horizon: row.horizon,
    budgetMode: row.budget_mode,
    budgetMin: row.budget_min,
    budgetMax: row.budget_max,
    email: row.email ?? undefined,
    phone: row.phone ?? undefined,
    linkedinUrl: row.linkedin_url ?? undefined,
    reviewStatus: row.review_status,
    submittedAt: row.submitted_at,
    deleteAfter: row.delete_after,
  }
}

const periodProjection = `
  id,
  started_at,
  scheduled_end_at,
  closed_at,
  CASE
    WHEN closed_at IS NOT NULL THEN closed_at
    WHEN scheduled_end_at IS NOT NULL AND scheduled_end_at < now() THEN scheduled_end_at
    ELSE NULL
  END AS effective_closed_at,
  closed_at IS NULL
    AND (scheduled_end_at IS NULL OR scheduled_end_at >= now()) AS is_open
`

export async function getActivePeriod() {
  const sql = getSql()
  const rows = asRows<PeriodRow>(await sql.query(
    `SELECT ${periodProjection}
     FROM submission_periods
     WHERE closed_at IS NULL
       AND (scheduled_end_at IS NULL OR scheduled_end_at >= now())
     ORDER BY started_at DESC
     LIMIT 1`
  ))

  return rows[0] ? mapPeriod(rows[0]) : null
}

export async function listPeriods() {
  const sql = getSql()
  const rows = asRows<PeriodRow>(await sql.query(
    `SELECT ${periodProjection}
     FROM submission_periods
     ORDER BY started_at DESC`
  ))

  return rows.map(mapPeriod)
}

export async function openSubmissionPeriod(scheduledEndDate?: string) {
  const sql = getSql()
  const endDate = scheduledEndDate || null

  const transactionResults = await sql.transaction((tx) => [
    tx`SELECT pg_advisory_xact_lock(642091)`,
    tx`UPDATE submission_periods
       SET closed_at = scheduled_end_at
       WHERE closed_at IS NULL
         AND scheduled_end_at IS NOT NULL
         AND scheduled_end_at < now()`,
    tx`INSERT INTO submission_periods (scheduled_end_at)
       SELECT CASE
         WHEN ${endDate}::text IS NULL THEN NULL
         ELSE (${endDate}::date + time '23:59:59') AT TIME ZONE 'Europe/Paris'
       END
       WHERE (
         ${endDate}::text IS NULL
         OR ((${endDate}::date + time '23:59:59') AT TIME ZONE 'Europe/Paris') > now()
       )
       AND NOT EXISTS (
         SELECT 1
         FROM submission_periods
         WHERE closed_at IS NULL
       )
       RETURNING id`,
  ])
  const inserted = asRows<{ id: string }>(transactionResults[2])

  if (!inserted[0]) {
    throw new Error('La date de fin doit être future.')
  }

  return inserted[0].id as string
}

export async function closeSubmissionPeriod(periodId: string) {
  const sql = getSql()
  const rows = asRows<{ id: string }>(await sql`UPDATE submission_periods
    SET closed_at = now()
    WHERE id = ${periodId}
      AND closed_at IS NULL
      AND (scheduled_end_at IS NULL OR scheduled_end_at >= now())
    RETURNING id`)

  return rows.length === 1
}

export async function updateSubmissionPeriodEnd(
  periodId: string,
  scheduledEndDate?: string
) {
  const sql = getSql()
  const endDate = scheduledEndDate || null
  const rows = asRows<{ id: string }>(await sql`UPDATE submission_periods
    SET scheduled_end_at = CASE
      WHEN ${endDate}::text IS NULL THEN NULL
      ELSE (${endDate}::date + time '23:59:59') AT TIME ZONE 'Europe/Paris'
    END
    WHERE id = ${periodId}
      AND closed_at IS NULL
      AND (scheduled_end_at IS NULL OR scheduled_end_at >= now())
      AND (
        ${endDate}::text IS NULL
        OR ((${endDate}::date + time '23:59:59') AT TIME ZONE 'Europe/Paris') > now()
      )
    RETURNING id`)

  return rows.length === 1
}

export async function canSubmitToPeriod(periodId: string, issuedAt: string) {
  const sql = getSql()
  const rows = asRows<{ allowed: boolean }>(await sql`SELECT EXISTS (
    SELECT 1
    FROM submission_periods
    WHERE id = ${periodId}
      AND started_at <= ${issuedAt}::timestamptz
      AND ${issuedAt}::timestamptz <= now() + interval '5 minutes'
      AND (
        (
          closed_at IS NULL
          AND (scheduled_end_at IS NULL OR scheduled_end_at >= now())
        )
        OR (
          COALESCE(closed_at, scheduled_end_at) IS NOT NULL
          AND ${issuedAt}::timestamptz <= COALESCE(closed_at, scheduled_end_at)
          AND now() <= COALESCE(closed_at, scheduled_end_at) + interval '24 hours'
        )
      )
  ) AS allowed`)

  return Boolean(rows[0]?.allowed)
}

export async function createSubmission(
  periodId: string,
  idempotencyKey: string,
  answers: ProjectAnswers
) {
  const sql = getSql()
  const budgetMin = answers.budgetMode === 'range' ? answers.budgetMin ?? null : null
  const budgetMax = answers.budgetMode === 'range' ? answers.budgetMax ?? null : null
  const rows = asRows<{ id: string }>(await sql`INSERT INTO project_submissions (
      period_id,
      idempotency_key,
      project_type,
      sector,
      project_stage,
      start_preference,
      desired_start_date,
      horizon,
      budget_mode,
      budget_min,
      budget_max,
      email,
      phone,
      linkedin_url
    ) VALUES (
      ${periodId},
      ${idempotencyKey}::uuid,
      ${answers.projectType},
      ${answers.sector},
      ${answers.projectStage},
      ${answers.startPreference},
      ${answers.desiredStartDate ?? null}::date,
      ${answers.horizon},
      ${answers.budgetMode},
      ${budgetMin},
      ${budgetMax},
      ${answers.email ?? null},
      ${answers.phone ?? null},
      ${answers.linkedinUrl ?? null}
    )
    ON CONFLICT (idempotency_key)
    DO UPDATE SET idempotency_key = EXCLUDED.idempotency_key
    RETURNING id`)

  return rows[0].id as string
}

export async function listSubmissions(periodId: string) {
  const sql = getSql()
  const rows = asRows<SubmissionRow>(await sql`SELECT
      id,
      period_id,
      project_type,
      sector,
      project_stage,
      start_preference,
      desired_start_date,
      horizon,
      budget_mode,
      budget_min,
      budget_max,
      email,
      phone,
      linkedin_url,
      review_status,
      submitted_at,
      delete_after
    FROM project_submissions
    WHERE period_id = ${periodId}
      AND delete_after > now()
    ORDER BY submitted_at DESC`)

  return rows.map(mapSubmission)
}

export async function getSubmission(submissionId: string) {
  const sql = getSql()
  const rows = asRows<SubmissionRow>(await sql`SELECT
      id,
      period_id,
      project_type,
      sector,
      project_stage,
      start_preference,
      desired_start_date,
      horizon,
      budget_mode,
      budget_min,
      budget_max,
      email,
      phone,
      linkedin_url,
      review_status,
      submitted_at,
      delete_after
    FROM project_submissions
    WHERE id = ${submissionId}
      AND delete_after > now()
    LIMIT 1`)

  return rows[0] ? mapSubmission(rows[0]) : null
}

export async function setSubmissionReviewStatus(
  submissionId: string,
  reviewStatus: 'to-review' | 'reviewed'
) {
  const sql = getSql()
  const rows = asRows<{ id: string }>(await sql`UPDATE project_submissions
    SET review_status = ${reviewStatus}
    WHERE id = ${submissionId}
      AND delete_after > now()
    RETURNING id`)

  return rows.length === 1
}

export async function deleteSubmission(submissionId: string) {
  const sql = getSql()
  const rows = asRows<{ id: string }>(await sql`DELETE FROM project_submissions
    WHERE id = ${submissionId}
    RETURNING id`)

  return rows.length === 1
}

export async function deleteExpiredSubmissions() {
  const sql = getSql()
  const rows = asRows<{ id: string }>(await sql`DELETE FROM project_submissions
    WHERE delete_after <= now()
    RETURNING id`)

  return rows.length
}
