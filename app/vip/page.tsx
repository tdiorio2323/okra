"use client"
import { useEffect, useState } from 'react'
import GlassCard from '@/components/GlassCard'
import type { LinkItem, LinkPage } from '@/lib/types'

export default function VipManagerPage() {
  const [slug, setSlug] = useState('colombia')
  const [page, setPage] = useState<LinkPage | null>(null)
  const [vip, setVip] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  async function load() {
    if (!slug) return
    setLoading(true); setMsg('')
    const res = await fetch(`/api/link-pages/${encodeURIComponent(slug)}`)
    if (res.ok) {
      const data = await res.json()
      setPage(data)
      setVip(data.vipCode || '')
    } else {
      setPage(null)
    }
    setLoading(false)
  }

  async function save() {
    if (!slug || !page) return
    setLoading(true); setMsg('')
    const res = await fetch(`/api/link-pages/${encodeURIComponent(slug)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...page, vipCode: vip }),
    })
    const data = await res.json()
    setLoading(false)
    setMsg(res.ok ? 'Saved' : data?.error || 'Save failed')
  }

  useEffect(() => { load() }, [])

  const toggleGated = (id: string) => {
    if (!page) return
    const links = page.links.map(l => l.id === id ? { ...l, gated: !l.gated } : l)
    setPage({ ...page, links })
  }

  return (
    <main className="min-h-screen p-6 text-white">
      <h1 className="text-2xl font-semibold mb-4">VIP Manager</h1>
      <GlassCard className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Slug</label>
            <input className="w-full rounded bg-white/10 border border-white/20 px-3 py-2" value={slug} onChange={e=>setSlug(e.target.value.trim())} />
          </div>
          <div>
            <label className="block text-sm mb-1">VIP Code</label>
            <input className="w-full rounded bg-white/10 border border-white/20 px-3 py-2" value={vip} onChange={e=>setVip(e.target.value)} placeholder="e.g. TD2025" />
          </div>
          <div className="flex items-end gap-2">
            <button className="btn-ghost" onClick={load} disabled={loading}>Load</button>
            <button className="btn-primary" onClick={save} disabled={!page || loading}>Save</button>
            {msg && <span className="text-white/70 text-sm">{msg}</span>}
          </div>
        </div>

        <h2 className="text-lg font-semibold mt-6 mb-2">Gated Links</h2>
        {page ? (
          <div className="space-y-2">
            {page.links.map((l: LinkItem) => (
              <label key={l.id} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <input type="checkbox" checked={!!l.gated} onChange={()=>toggleGated(l.id)} />
                <span className="flex-1">{l.label || l.id}</span>
                <span className="text-white/60 text-sm">{l.url}</span>
              </label>
            ))}
          </div>
        ) : (
          <p className="text-white/60">No page loaded.</p>
        )}
      </GlassCard>
    </main>
  )
}

