import { NextResponse } from 'next/server'
import { getBySlug } from '@/lib/linkStore'
import { recordClick } from '@/lib/analytics'

type Ctx = { params: { slug: string; linkId: string } }

export async function GET(req: Request, { params }: Ctx) {
  const page = getBySlug(params.slug)
  if (!page) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const link = page.links.find(l => l.id === params.linkId)
  if (!link) return NextResponse.json({ error: 'link not found' }, { status: 404 })

  // record click
  const referer = req.headers.get('referer') || undefined
  const ua = req.headers.get('user-agent') || undefined
  recordClick({ slug: params.slug, linkId: params.linkId, ts: Date.now(), referer, ua })

  return NextResponse.redirect(link.url, { status: 302 })
}

