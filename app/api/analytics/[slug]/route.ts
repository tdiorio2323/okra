import { NextResponse } from 'next/server'
import { getStats } from '@/lib/analytics'

type Ctx = { params: { slug: string } }

export async function GET(_req: Request, { params }: Ctx) {
  return NextResponse.json(getStats(params.slug))
}

