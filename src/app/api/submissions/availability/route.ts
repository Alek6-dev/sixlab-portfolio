import { NextResponse } from 'next/server'
import { getActivePeriod } from '@/lib/submissions/repository'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const period = await getActivePeriod()

    return NextResponse.json(
      {
        open: Boolean(period),
        scheduledEndAt: period?.scheduledEndAt ?? null,
      },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  } catch {
    return NextResponse.json(
      { open: false, scheduledEndAt: null },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  }
}
