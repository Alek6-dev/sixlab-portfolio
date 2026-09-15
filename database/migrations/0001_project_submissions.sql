CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS submission_periods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamptz NOT NULL DEFAULT now(),
  scheduled_end_at timestamptz,
  closed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT submission_periods_scheduled_end_after_start
    CHECK (scheduled_end_at IS NULL OR scheduled_end_at > started_at),
  CONSTRAINT submission_periods_close_after_start
    CHECK (closed_at IS NULL OR closed_at >= started_at)
);

CREATE UNIQUE INDEX IF NOT EXISTS submission_periods_one_unclosed_idx
  ON submission_periods ((1))
  WHERE closed_at IS NULL;

CREATE TABLE IF NOT EXISTS project_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  period_id uuid NOT NULL REFERENCES submission_periods(id) ON DELETE RESTRICT,
  idempotency_key uuid NOT NULL UNIQUE,
  project_type text NOT NULL CHECK (
    project_type IN ('website', 'application', 'internal-tool', 'automation', 'other')
  ),
  sector text NOT NULL CHECK (
    sector IN (
      'finance-management',
      'sport-leisure',
      'health-wellbeing',
      'building-real-estate',
      'commerce-retail',
      'tourism-hospitality',
      'education-training',
      'culture-events',
      'industry-logistics',
      'tech-digital',
      'other'
    )
  ),
  project_stage text NOT NULL CHECK (
    project_stage IN ('idea', 'structured-need', 'in-progress', 'existing-product')
  ),
  start_preference text NOT NULL CHECK (
    start_preference IN ('now', 'date', 'unscheduled')
  ),
  desired_start_date date,
  horizon text NOT NULL CHECK (
    horizon IN ('under-1-month', '1-3-months', '3-6-months', '6-12-months', 'over-1-year', 'no-deadline')
  ),
  budget_mode text NOT NULL CHECK (
    budget_mode IN ('range', 'below-minimum', 'above-maximum', 'undefined')
  ),
  budget_min integer,
  budget_max integer,
  email text,
  phone text,
  linkedin_url text,
  review_status text NOT NULL DEFAULT 'to-review' CHECK (
    review_status IN ('to-review', 'reviewed')
  ),
  submitted_at timestamptz NOT NULL DEFAULT now(),
  delete_after timestamptz NOT NULL DEFAULT (now() + interval '12 months'),
  CONSTRAINT project_submissions_contact_required
    CHECK (email IS NOT NULL OR phone IS NOT NULL OR linkedin_url IS NOT NULL),
  CONSTRAINT project_submissions_start_date_consistency
    CHECK (
      (start_preference = 'date' AND desired_start_date IS NOT NULL)
      OR (start_preference <> 'date')
    ),
  CONSTRAINT project_submissions_budget_consistency
    CHECK (
      (
        budget_mode = 'range'
        AND budget_min IS NOT NULL
        AND budget_max IS NOT NULL
        AND budget_min >= 500
        AND budget_max >= budget_min
      )
      OR (
        budget_mode <> 'range'
        AND budget_min IS NULL
        AND budget_max IS NULL
      )
    )
);

CREATE INDEX IF NOT EXISTS project_submissions_period_submitted_idx
  ON project_submissions (period_id, submitted_at DESC);

CREATE INDEX IF NOT EXISTS project_submissions_retention_idx
  ON project_submissions (delete_after);
