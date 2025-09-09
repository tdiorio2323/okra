export type ClickEvent = {
  slug: string
  linkId: string
  ts: number
  referer?: string
  ua?: string
}

export type LinkTotals = {
  linkId: string
  count: number
}

export type SeriesPoint = { label: string; count: number }
export type AnalyticsReport = {
  slug: string
  total: number
  perLink: LinkTotals[]
  last24h: number
  // New breakdowns
  hourly24h: SeriesPoint[]
  daily7d: SeriesPoint[]
  referrers: SeriesPoint[]
  devices: SeriesPoint[]
}

const clicks: ClickEvent[] = []

function dayKey(ts: number) {
  const d = new Date(ts)
  // YYYY-MM-DD
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
}

function hourKey(ts: number) {
  const d = new Date(ts)
  return `${String(d.getUTCHours()).padStart(2, '0')}:00`
}

function toHost(ref?: string) {
  if (!ref) return 'direct'
  try {
    const u = new URL(ref)
    return u.hostname.replace(/^www\./, '')
  } catch {
    return 'other'
  }
}

function parseDevice(ua?: string) {
  const s = (ua || '').toLowerCase()
  if (!s) return 'unknown'
  if (s.includes('ipad') || s.includes('tablet')) return 'tablet'
  if (s.includes('mobi') || s.includes('iphone') || s.includes('android')) return 'mobile'
  return 'desktop'
}

export function recordClick(evt: ClickEvent) {
  clicks.push(evt)
}

export function getStats(slug: string): AnalyticsReport {
  const now = Date.now()
  const events = clicks.filter(c => c.slug === slug)
  const byLink = new Map<string, number>()
  for (const c of events) {
    byLink.set(c.linkId, (byLink.get(c.linkId) || 0) + 1)
  }
  const perLink = Array.from(byLink.entries()).map(([linkId, count]) => ({ linkId, count }))
  perLink.sort((a,b) => b.count - a.count)
  const last24h = events.filter(c => now - c.ts <= 24 * 60 * 60 * 1000).length
  // hourly (last 24h)
  const hourMap = new Map<string, number>()
  const since24 = now - 24 * 60 * 60 * 1000
  for (let i = 0; i < 24; i++) {
    const t = since24 + i * 60 * 60 * 1000
    hourMap.set(hourKey(t), 0)
  }
  events.filter(e => e.ts >= since24).forEach(e => {
    const k = hourKey(e.ts)
    hourMap.set(k, (hourMap.get(k) || 0) + 1)
  })
  const hourly24h = Array.from(hourMap.entries()).map(([label, count]) => ({ label, count }))

  // daily (last 7 days)
  const dayMap = new Map<string, number>()
  const since7 = now - 7 * 24 * 60 * 60 * 1000
  for (let i = 6; i >= 0; i--) {
    const t = now - i * 24 * 60 * 60 * 1000
    dayMap.set(dayKey(t), 0)
  }
  events.filter(e => e.ts >= since7).forEach(e => {
    const k = dayKey(e.ts)
    dayMap.set(k, (dayMap.get(k) || 0) + 1)
  })
  const daily7d = Array.from(dayMap.entries()).map(([label, count]) => ({ label, count }))

  // referrers
  const refMap = new Map<string, number>()
  events.forEach(e => {
    const h = toHost(e.referer)
    refMap.set(h, (refMap.get(h) || 0) + 1)
  })
  const referrers = Array.from(refMap.entries()).map(([label, count]) => ({ label, count }))
  referrers.sort((a,b) => b.count - a.count)

  // devices
  const devMap = new Map<string, number>()
  events.forEach(e => {
    const d = parseDevice(e.ua)
    devMap.set(d, (devMap.get(d) || 0) + 1)
  })
  const devices = Array.from(devMap.entries()).map(([label, count]) => ({ label, count }))
  devices.sort((a,b) => b.count - a.count)

  return { slug, total: events.length, perLink, last24h, hourly24h, daily7d, referrers, devices }
}
