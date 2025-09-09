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

export type AnalyticsReport = {
  slug: string
  total: number
  perLink: LinkTotals[]
  last24h: number
}

const clicks: ClickEvent[] = []

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
  return { slug, total: events.length, perLink, last24h }
}

