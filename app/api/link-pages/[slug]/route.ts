import { NextResponse } from 'next/server'
import { getBySlug, remove, upsert } from '../../../../lib/linkStore'
import type { LinkPage } from '../../../../lib/types'

type Ctx = { params: { slug: string } }

export async function GET(_req: Request, { params }: Ctx) {
  const page = getBySlug(params.slug)
  if (!page) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(page)
}

export async function PUT(req: Request, { params }: Ctx) {
  const body = (await req.json()) as Partial<LinkPage>
  if (!body?.title) {
    return NextResponse.json({ error: 'title required' }, { status: 400 })
  }
  const saved = upsert({
    slug: params.slug,
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
  return NextResponse.json(saved)
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const ok = remove(params.slug)
  return NextResponse.json({ ok })
}
