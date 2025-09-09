import { NextResponse } from 'next/server'
import { writeFile, mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const UPLOAD_DIR = 'public/uploads'

export async function GET() {
  try {
    const files = await readdir(UPLOAD_DIR).catch(() => [])
    const urls = files.filter(f => !f.startsWith('.')).map(f => `/uploads/${f}`)
    return NextResponse.json({ files: urls })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'list failed' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as { dataUrl: string; filename?: string }
    if (!body?.dataUrl?.startsWith('data:')) return NextResponse.json({ error: 'dataUrl required' }, { status: 400 })
    const [, meta, b64] = body.dataUrl.match(/^data:(.*?);base64,(.*)$/) || []
    if (!b64) return NextResponse.json({ error: 'invalid dataUrl' }, { status: 400 })
    const buf = Buffer.from(b64, 'base64')
    const ext = (meta?.split('/')[1] || 'png').split(';')[0]
    const name = `${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`
    const path = join(UPLOAD_DIR)
    await mkdir(path, { recursive: true })
    await writeFile(join(path, name), buf)
    return NextResponse.json({ url: `/uploads/${name}` }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'upload failed' }, { status: 500 })
  }
}

