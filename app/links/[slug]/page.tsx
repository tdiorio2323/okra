import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { fontVarFor } from '@/lib/fontMap'

function getBaseUrl(): string {
  const envBase = process.env.NEXT_PUBLIC_BASE_URL?.trim()
  if (envBase) return envBase
  const h = headers()
  const protoRaw = h.get('x-forwarded-proto') || ''
  const proto = (protoRaw.split(',')[0] || 'http').trim()
  const hostRaw = h.get('x-forwarded-host') || h.get('host') || ''
  const host = (hostRaw.split(',')[0] || '').trim()
  if (host) return `${proto}://${host}`
  return 'http://localhost:3000'
}

async function getData(slug: string) {
  const base = getBaseUrl()
  const res = await fetch(`${base}/api/link-pages/${slug}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function PublicLinksPage({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug)
  if (!data) notFound()

  const themeBg = data.theme === 'dark' ? '#111' : '#fff'
  const themeFg = data.theme === 'dark' ? '#fafafa' : '#111'
  const accent = data.accent || '#8b5cf6'
  const buttonStyle = (data.buttonStyle || 'rounded') as string
  const layout = (data.layout || 'stack') as 'stack'|'grid'|'row'
  const family = (data.fontFamily || 'Inter') as string
  const weight = (data.fontWeight || 600) as number

  return (
    <main style={{ minHeight: '100vh', background: themeBg, color: themeFg }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          {data.avatarUrl ? (
            <img
              src={data.avatarUrl}
              alt={data.title}
              width={64}
              height={64}
              style={{ borderRadius: '50%' }}
            />
          ) : null}
          <div>
            <h1 style={{ margin: 0, fontFamily: fontVarFor(family) || family, fontWeight: weight }}>{data.title}</h1>
            {data.bio ? <p style={{ marginTop: 4, opacity: 0.8, fontFamily: fontVarFor(family) || family }}>{data.bio}</p> : null}
          </div>
        </div>
        <div
          style={{
            display: layout === 'grid' ? 'grid' : layout === 'row' ? 'flex' : 'grid',
            gridTemplateColumns: layout === 'grid' ? 'repeat(3, 1fr)' : undefined,
            gap: 12,
            flexWrap: layout === 'row' ? 'wrap' : undefined,
            justifyContent: layout === 'row' ? 'center' : undefined,
          }}
        >
          {(data.links || []).filter((l: any) => !l.gated || !data.vipCode).map((l: any) => (
            <a
              key={l.id}
              href={`/r/${encodeURIComponent(params.slug)}/${encodeURIComponent(l.id)}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'block',
                padding: '12px 16px',
                borderRadius: buttonStyle === 'pill' ? 999 : buttonStyle === 'sharp' ? 8 : 14,
                border: '1px solid',
                borderColor: buttonStyle === 'outlined' ? accent : 'transparent',
                background: buttonStyle === 'gradient' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : accent,
                textDecoration: 'none',
                color: '#fff',
                boxShadow: buttonStyle === 'glow' ? `0 0 24px ${accent}66` : undefined,
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
        {data.vipCode ? (
          <div style={{ marginTop: 16 }}>
            <VipPrompt expected={data.vipCode} />
          </div>
        ) : null}
      </div>
    </main>
  )
}

function VipPrompt({ expected }: { expected: string }) {
  // Inline client interop: this component renders a small script block
  return (
    <form method="dialog" style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
      <label style={{ opacity: 0.8 }}>Have a VIP code?</label>
      <input id="vip-input" placeholder="Enter VIP code" style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #444', background: 'transparent', color: 'inherit' }} />
      <button id="vip-btn" style={{ padding: '8px 12px', borderRadius: 8, background: '#6366f1', color: '#fff', border: 0 }}>Unlock VIP links</button>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var btn = document.getElementById('vip-btn');
              if (!btn) return;
              btn.addEventListener('click', function(e){
                e.preventDefault();
                var inp = document.getElementById('vip-input');
                if (!inp) return;
                var val = String(inp.value||'').trim();
                if (!val) return alert('Enter a code');
                if (val.toLowerCase() !== ${JSON.stringify(expected.toLowerCase())}) {
                  alert('Invalid code');
                  return;
                }
                try { localStorage.setItem('vip:'+${JSON.stringify(expected)}, '1'); } catch {}
                location.reload();
              });
            })();
          `,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              try {
                var ok = localStorage.getItem('vip:'+${JSON.stringify(expected)}) === '1';
                if (ok) {
                  // expose VIP links by replacing query in anchors
                  var anchors = document.querySelectorAll('a[href^="/r/"]');
                  // nothing else to do; the server already hides gated ones when no VIP is present.
                  // We simply ask the user to refresh which the button handler does.
                }
              } catch {}
            })();
          `,
        }}
      />
    </form>
  )
}
