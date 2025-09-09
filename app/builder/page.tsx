"use client"
import { useEffect, useMemo, useState } from 'react'
import GlassCard from 'components/GlassCard'
import FontLoader from 'components/FontLoader'
import { fontVarFor } from 'lib/fontMap'

type LinkItem = { id: string; label: string; url: string }

const themes = [
  'Minimal',
  'Holographic',
  'Cyberpunk',
  'Glassmorphism',
  'Dark Mode',
  'Pastel Dreams',
  'Vintage Retro',
  'Futuristic Sci‑Fi',
  'Nature Inspired',
  'Luxury Gold',
  'Grunge Punk',
  'Kawaii Cute',
  'Mystic Fantasy',
  'Seductive Noir',
] as const

const fonts = [
  'Inter',
  'Playfair Display',
  'Space Mono',
  'Poppins',
  'Montserrat',
  'Roboto',
  'Lato',
  'Oswald',
  'Raleway',
  'Brush Script MT',
  'Franklin Gothic Medium',
  'Comic Sans MS',
] as const

type ButtonStyle = 'rounded' | 'sharp' | 'pill' | 'glow' | 'outlined' | 'gradient' | 'hover' | 'shadow' | 'icon' | 'minimal'
type ButtonLayout = 'stack' | 'grid' | 'row'

type BuilderState = {
  theme: typeof themes[number]
  fontFamily: typeof fonts[number]
  fontWeight: number
  scheme: 'monochrome' | 'vibrant' | 'sunset' | 'violet'
  accent: string
  buttonStyle: ButtonStyle
  layout: ButtonLayout
  handle: string
  links: LinkItem[]
  avatarDataUrl?: string
}

const defaultState: BuilderState = {
  theme: 'Glassmorphism',
  fontFamily: 'Inter',
  fontWeight: 600,
  scheme: 'violet',
  accent: '#8b5cf6',
  buttonStyle: 'rounded',
  layout: 'stack',
  handle: '@yourusername',
  links: [
    { id: crypto.randomUUID(), label: 'Instagram', url: 'https://instagram.com/' },
    { id: crypto.randomUUID(), label: 'Shop', url: 'https://example.com/' },
    { id: crypto.randomUUID(), label: 'Contact', url: 'mailto:hello@example.com' },
  ],
}

export default function BuilderPage() {
  const [state, setState] = useState<BuilderState>(() => {
    if (typeof window === 'undefined') return defaultState
    try {
      const raw = localStorage.getItem('builder:state')
      return raw ? { ...defaultState, ...JSON.parse(raw) } as BuilderState : defaultState
    } catch {
      return defaultState
    }
  })

  useEffect(() => {
    try { localStorage.setItem('builder:state', JSON.stringify(state)) } catch {}
  }, [state])

  const buttonClass = useMemo(() => buttonClassFor(state), [state])
  const [slug, setSlug] = useState('colombia')
  const [title, setTitle] = useState('TD Studios')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState<string | null>(null)

  function onAvatarChange(file?: File | null) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setState(s => ({ ...s, avatarDataUrl: String(reader.result) }))
    reader.readAsDataURL(file)
  }

  function updateLink(id: string, patch: Partial<LinkItem>) {
    setState(s => ({
      ...s,
      links: s.links.map(l => l.id === id ? { ...l, ...patch } : l)
    }))
  }

  function addLink() {
    setState(s => ({ ...s, links: [...s.links, { id: crypto.randomUUID(), label: 'New Link', url: 'https://'}] }))
  }

  function removeLink(id: string) {
    setState(s => ({ ...s, links: s.links.filter(l => l.id !== id) }))
  }

  return (
    <main className="min-h-screen p-4 md:p-8 text-white">
      <h1 className="text-2xl font-semibold mb-4">Design your experience • Live preview</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <GlassCard className="glass p-6">
          {/* Identity */}
          <section className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Slug</label>
                <input className="w-full rounded-xl bg-white/10 border border-white/20 p-3 outline-none" value={slug} onChange={e=>setSlug(e.target.value.trim())} placeholder="yourname" />
              </div>
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input className="w-full rounded-xl bg-white/10 border border-white/20 p-3 outline-none" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Your Name" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button
                className="btn-primary"
                disabled={!slug || !title || saving}
                onClick={async ()=>{
                  setSaving(true); setSaveMsg(null)
                  try {
                    const payload = {
                      slug,
                      title,
                      bio: state.handle,
                      avatarUrl: state.avatarDataUrl || '',
                      theme: 'dark' as const,
                      fontFamily: state.fontFamily,
                      fontWeight: state.fontWeight,
                      scheme: state.scheme,
                      accent: state.accent,
                      buttonStyle: state.buttonStyle,
                      layout: state.layout,
                      links: state.links,
                    }
                    const res = await fetch(`/api/link-pages/${encodeURIComponent(slug)}`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload),
                    })
                    if (res.ok) setSaveMsg('Saved!')
                    else {
                      const j = await res.json().catch(()=>({}))
                      setSaveMsg(j?.error || 'Save failed')
                    }
                  } finally {
                    setSaving(false)
                  }
                }}
              >{saving ? 'Saving…' : 'Save'}</button>
              <a className="btn-ghost" href={slug ? `/links/${slug}` : '#'} target="_blank" rel="noreferrer">Preview</a>
              {saveMsg && <span className="text-sm text-white/70">{saveMsg}</span>}
            </div>
          </section>
          {/* Identity */}
          <section className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Slug</label>
                <input className="w-full rounded-xl bg-white/10 border border-white/20 p-3 outline-none" value={slug} onChange={e=>setSlug(e.target.value.trim())} placeholder="yourname" />
              </div>
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input className="w-full rounded-xl bg-white/10 border border-white/20 p-3 outline-none" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Your Name" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button
                className="btn-primary"
                disabled={!slug || !title || saving}
                onClick={async ()=>{
                  setSaving(true); setSaveMsg(null)
                  try {
                    const payload = {
                      slug,
                      title,
                      bio: state.handle,
                      avatarUrl: state.avatarDataUrl || '',
                      theme: 'dark' as const,
                      links: state.links,
                    }
                    const res = await fetch(, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload),
                    })
                    if (res.ok) setSaveMsg('Saved!')
                    else {
                      const j = await res.json().catch(()=>({}))
                      setSaveMsg(j?.error || 'Save failed')
                    }
                  } finally {
                    setSaving(false)
                  }
                }}
              >{saving ? 'Saving…' : 'Save'}</button>
              <a className="btn-ghost" href={slug ?  : '#'} target="_blank" rel="noreferrer">Preview</a>
              {saveMsg && <span className="text-sm text-white/70">{saveMsg}</span>}
            </div>
          </section>
          {/* Theme */}
          <section className="mb-6">
            <h2 className="text-sm uppercase tracking-wide text-white/70 mb-2">Choose Your Theme</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {themes.map(t => (
                <button
                  key={t}
                  onClick={() => setState(s => ({ ...s, theme: t }))}
                  className={[
                    'rounded-xl px-3 py-2 text-sm border',
                    state.theme === t ? 'bg-white/20 border-white/40' : 'bg-white/10 border-white/20 hover:bg-white/15'
                  ].join(' ')}
                >{t}</button>
              ))}
            </div>
          </section>

          {/* Typography */}
          <section className="mb-6">
            <h2 className="text-sm uppercase tracking-wide text-white/70 mb-2">Select Your Font</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {fonts.map(f => (
                <button
                  key={f}
                  onClick={() => setState(s => ({ ...s, fontFamily: f }))}
                  className={[
                    'rounded-xl px-3 py-2 text-sm border',
                    state.fontFamily === f ? 'bg-white/20 border-white/40' : 'bg-white/10 border-white/20 hover:bg-white/15'
                  ].join(' ')}
                  style={{ fontFamily: f }}
                >{f}</button>
              ))}
            </div>
            <div className="mt-3">
              <label className="text-sm block mb-1">Font Weight</label>
              <input
                type="range"
                min={300}
                max={900}
                step={100}
                value={state.fontWeight}
                onChange={e => setState(s => ({ ...s, fontWeight: Number(e.target.value) }))}
              />
            </div>
          </section>

          {/* Colors */}
          <section className="mb-6">
            <h2 className="text-sm uppercase tracking-wide text-white/70 mb-2">Color Scheme</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {([
                ['monochrome','Monochrome'],
                ['vibrant','Vibrant Tropical'],
                ['sunset','Sunset'],
                ['violet','Violet'],
              ] as const).map(([k, label]) => (
                <button key={k}
                  onClick={() => setState(s => ({ ...s, scheme: k }))}
                  className={[
                    'rounded-xl px-3 py-2 text-sm border',
                    state.scheme === k ? 'bg-white/20 border-white/40' : 'bg-white/10 border-white/20 hover:bg-white/15'
                  ].join(' ')}
                >{label}</button>
              ))}
            </div>
            <label className="text-sm block mb-1">Accent Color</label>
            <input type="color" value={state.accent} onChange={e => setState(s => ({...s, accent: e.target.value}))} />
          </section>

          {/* Buttons */}
          <section className="mb-6">
            <h2 className="text-sm uppercase tracking-wide text-white/70 mb-2">Button Style</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(['rounded','sharp','pill','glow','outlined','gradient','hover','shadow','icon','minimal'] as ButtonStyle[]).map(bs => (
                <button key={bs} onClick={() => setState(s=>({...s, buttonStyle: bs}))}
                  className={[
                    'rounded-xl px-3 py-2 text-sm border capitalize',
                    state.buttonStyle === bs ? 'bg-white/20 border-white/40' : 'bg-white/10 border-white/20 hover:bg-white/15'
                  ].join(' ')}
                >{bs}</button>
              ))}
            </div>
            <h2 className="text-sm uppercase tracking-wide text-white/70 mt-4 mb-2">Button Layout</h2>
            <div className="flex gap-2">
              {([
                ['stack','Stacked'],
                ['grid','3x3 Icon Grid'],
                ['row','Horizontal Row'],
              ] as const).map(([k,label]) => (
                <button key={k} onClick={() => setState(s=>({...s, layout: k as ButtonLayout}))}
                  className={[
                    'rounded-xl px-3 py-2 text-sm border',
                    state.layout === k ? 'bg.white/20 border-white/40' : 'bg-white/10 border-white/20 hover:bg-white/15'
                  ].join(' ')}
                >{label}</button>
              ))}
            </div>
          </section>

          {/* Avatar */}
          <section className="mb-6">
            <h2 className="text-sm uppercase tracking-wide text-white/70 mb-2">Choose Profile Picture</h2>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full overflow-hidden bg-white/10 border border-white/20 grid place-items-center">
                {state.avatarDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={state.avatarDataUrl} alt="avatar" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl">✨</span>
                )}
              </div>
              <label className="btn-ghost cursor-pointer">
                Upload
                <input type="file" accept="image/*" className="hidden" onChange={e=>onAvatarChange(e.target.files?.[0])} />
              </label>
            </div>
          </section>

          {/* Handle */}
          <section className="mb-6">
            <label className="block text-sm mb-1">Social Handle (Optional)</label>
            <input
              className="w-full rounded-xl bg-white/10 border border-white/20 p-3 outline-none"
              placeholder="@yourusername"
              value={state.handle}
              onChange={e=>setState(s=>({...s, handle: e.target.value}))}
            />
          </section>

          {/* Links */}
          <section>
            <h2 className="text-sm uppercase tracking-wide text-white/70 mb-2">Links</h2>
            <div className="space-y-3">
              {state.links.map(l => (
                <div key={l.id} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2 items-center">
                  <input
                    className="rounded-xl bg-white/10 border border-white/20 p-3 outline-none"
                    placeholder="Label"
                    value={l.label}
                    onChange={e=>updateLink(l.id, { label: e.target.value })}
                  />
                  <input
                    className="rounded-xl bg-white/10 border border-white/20 p-3 outline-none"
                    placeholder="https://…"
                    value={l.url}
                    onChange={e=>updateLink(l.id, { url: e.target.value })}
                  />
                  <button className="btn-ghost" onClick={()=>removeLink(l.id)}>✕</button>
                </div>
              ))}
            </div>
            <button className="btn-primary mt-3" onClick={addLink}>+ Add Link</button>
          </section>
        </GlassCard>

        {/* Preview */}
        <div>
          {/* Only load dynamic font if not one of the preloaded families */}
          {!fontVarFor(state.fontFamily) && (
            <FontLoader family={state.fontFamily} weights={[300,400,600,700, state.fontWeight]} />
          )}
          <GlassCard className="p-8 flex flex-col items-center" style={{
            fontFamily: fontVarFor(state.fontFamily) || state.fontFamily,
            fontWeight: state.fontWeight as any,
          }}>
            <div className="h-28 w-28 rounded-full overflow-hidden bg-white/10 border border-white/20 grid place-items-center mb-4">
              {state.avatarDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={state.avatarDataUrl} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <span className="text-3xl">⭐</span>
              )}
            </div>
            <h3 className="text-xl font-semibold mb-1">Your Name</h3>
            {state.handle && <p className="text-white/70 text-sm mb-6">{state.handle}</p>}

            {/* Buttons */}
            <div className={
              state.layout === 'grid' ? 'grid grid-cols-3 gap-3 w-full' :
              state.layout === 'row' ? 'flex gap-3 flex-wrap justify-center w-full' :
              'flex flex-col gap-3 w-full'
            }>
              {state.links.map(l => (
                <a key={l.id} href={l.url} target="_blank" rel="noreferrer" className={buttonClass} style={{
                  // basic scheme accents
                  ...(state.buttonStyle === 'gradient' ? { backgroundImage: gradientFor(state) } : { backgroundColor: state.accent }),
                  color: '#fff',
                  borderColor: state.accent,
                  boxShadow: state.buttonStyle === 'glow' ? `0 0 24px ${state.accent}66` : undefined,
                }}>{l.label}</a>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  )
}

function buttonClassFor(s: BuilderState) {
  const base = 'text-center px-4 py-2 font-medium transition'
  const radius = s.buttonStyle === 'sharp' ? 'rounded-md' : s.buttonStyle === 'pill' ? 'rounded-full' : 'rounded-xl'
  const border = s.buttonStyle === 'outlined' ? 'border-2 bg-transparent text-white' : 'border border-transparent'
  const extra = [
    s.buttonStyle === 'hover' && 'hover:opacity-90',
    s.buttonStyle === 'shadow' && 'shadow-lg',
    s.layout === 'stack' && 'w-full',
  ].filter(Boolean).join(' ')
  return [base, radius, border, extra].join(' ')
}

function gradientFor(s: BuilderState) {
  switch (s.scheme) {
    case 'monochrome': return 'linear-gradient(135deg, #111, #444)'
    case 'sunset': return 'linear-gradient(135deg, #FF512F, #F09819)'
    case 'vibrant': return 'linear-gradient(135deg, #22c55e, #06b6d4)'
    case 'violet':
    default: return 'linear-gradient(135deg, #8b5cf6, #6366f1)'
  }
}
