import { NextResponse } from 'next/server'
import { getAll, upsert } from '../../../lib/linkStore'
import type { LinkPage } from '../../../lib/types'

export async function GET() {
  return NextResponse.json(getAll())
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<LinkPage>
  if (!body?.slug || !body?.title) {
    return NextResponse.json({ error: 'slug and title required' }, { status: 400 })
  }
  const saved = upsert({
    slug: body.slug,
    title: body.title,
    bio: body.bio ?? '',
    avatarUrl: body.avatarUrl ?? '',
    theme: (body.theme as any) ?? 'light',
    fontFamily: body.fontFamily,
    fontWeight: body.fontWeight,
    scheme: body.scheme as any,
    accent: body.accent,
    buttonStyle: body.buttonStyle,
    layout: body.layout as any,
    vipCode: body.vipCode,
    links: body.links ?? [],
  })
  return NextResponse.json(saved, { status: 201 })
}
