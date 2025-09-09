"use client"
import { useEffect, useMemo, useState } from 'react'

type LinkRow = { linkId: string; count: number }
type SeriesPoint = { label: string; count: number }
type Report = {
  slug: string; total: number; last24h: number; perLink: LinkRow[];
  hourly24h: SeriesPoint[]; daily7d: SeriesPoint[]; referrers: SeriesPoint[]; devices: SeriesPoint[];
}

export default function DashboardPage() {
  const [slug, setSlug] = useState('colombia')
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(false)

  async function load() {
    if (!slug) return
    setLoading(true)
    try {
      const res = await fetch(`/api/analytics/${encodeURIComponent(slug)}`, { cache: 'no-store' })
      const data = await res.json()
      setReport(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const top = useMemo(() => report?.perLink.slice(0, 10) || [], [report])

  return (
    <main className="min-h-screen p-6 text-white">
      <h1 className="text-2xl font-semibold mb-4">Analytics Dashboard</h1>
      <div className="flex gap-2 items-end mb-6">
        <div>
          <label className="block text-sm mb-1">Slug</label>
          <input value={slug} onChange={e=>setSlug(e.target.value.trim())} className="rounded bg-white/10 border border-white/20 px-3 py-2" />
        </div>
        <button onClick={load} className="btn-primary" disabled={!slug || loading}>{loading ? 'Loading…' : 'Refresh'}</button>
      </div>
      {report && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass p-4 rounded-2xl">
            <div className="text-sm text-white/70">Total clicks</div>
            <div className="text-3xl font-bold">{report.total}</div>
          </div>
          <div className="glass p-4 rounded-2xl">
            <div className="text-sm text-white/70">Last 24h</div>
            <div className="text-3xl font-bold">{report.last24h}</div>
          </div>
          <div className="glass p-4 rounded-2xl md:col-span-1">
            <div className="text-sm text-white/70">Unique links</div>
            <div className="text-3xl font-bold">{report.perLink.length}</div>
          </div>
        </div>
      )}

      {report && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass p-4 rounded-2xl">
            <h3 className="font-semibold mb-2">Last 24h (hourly)</h3>
            <BarRow data={report.hourly24h} />
          </div>
          <div className="glass p-4 rounded-2xl">
            <h3 className="font-semibold mb-2">Last 7 days (daily)</h3>
            <BarRow data={report.daily7d} />
          </div>
        </div>
      )}

      {report && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass p-4 rounded-2xl">
            <h3 className="font-semibold mb-2">Top Referrers</h3>
            <table className="w-full text-left text-sm">
              <tbody>
                {(report.referrers || []).slice(0,10).map(r => (
                  <tr key={r.label}>
                    <td className="py-1 pr-3 text-white/80">{r.label}</td>
                    <td className="py-1 text-white/60">{r.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="glass p-4 rounded-2xl">
            <h3 className="font-semibold mb-2">Devices</h3>
            <div className="flex gap-4">
              {(report.devices || []).map(d => (
                <div key={d.label} className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                  <div className="text-xs text-white/60">{d.label}</div>
                  <div className="text-xl font-semibold">{d.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <h2 className="mt-8 mb-3 text-lg font-semibold">Top Links</h2>
      <div className="overflow-x-auto">
        <table className="min-w-[480px] w-full text-left border-separate border-spacing-y-2">
          <thead className="text-white/70 text-sm">
            <tr>
              <th className="px-3">Link ID</th>
              <th className="px-3">Clicks</th>
              <th className="px-3">Preview</th>
            </tr>
          </thead>
          <tbody>
            {top.map(row => (
              <tr key={row.linkId} className="">
                <td className="px-3 py-2 bg-white/5 rounded-l-lg border border-white/10">{row.linkId}</td>
                <td className="px-3 py-2 bg-white/5 border-t border-b border-white/10">{row.count}</td>
                <td className="px-3 py-2 bg-white/5 rounded-r-lg border border-white/10">
                  <a className="text-indigo-300 hover:text-indigo-200" href={`/links/${encodeURIComponent(slug)}`} target="_blank" rel="noreferrer">Open page</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

function BarRow({ data }: { data: SeriesPoint[] }) {
  const max = Math.max(1, ...data.map(d => d.count))
  return (
    <div className="grid gap-2">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-2">
          <div className="w-16 text-xs text-white/60">{d.label}</div>
          <div className="flex-1 h-2 bg-white/10 rounded">
            <div className="h-2 bg-indigo-500 rounded" style={{ width: `${(d.count / max) * 100}%` }} />
          </div>
          <div className="w-10 text-right text-xs text-white/70">{d.count}</div>
        </div>
      ))}
    </div>
  )
}
