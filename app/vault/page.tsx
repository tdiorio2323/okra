"use client"
import { useEffect, useState } from 'react'
import GlassCard from '@/components/GlassCard'

type VaultResp = { files: string[] }

export default function VaultPage() {
  const [files, setFiles] = useState<string[]>([])
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const [msg, setMsg] = useState('')

  async function refresh() {
    const res = await fetch('/api/upload', { cache: 'no-store' })
    const j: VaultResp = await res.json()
    setFiles(j.files || [])
  }

  async function upload() {
    if (!dataUrl) return
    setMsg('Uploading…')
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataUrl }),
    })
    const j = await res.json()
    setMsg(res.ok ? 'Uploaded' : j?.error || 'Upload failed')
    await refresh()
  }

  useEffect(() => { refresh() }, [])

  function onFile(f?: File | null) {
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => setDataUrl(String(reader.result))
    reader.readAsDataURL(f)
  }

  return (
    <main className="min-h-screen p-6 text-white">
      <h1 className="text-2xl font-semibold mb-4">Media Vault</h1>
      <GlassCard className="p-6">
        <div className="flex items-center gap-3">
          <label className="btn-ghost cursor-pointer">Choose Image<input type="file" accept="image/*" className="hidden" onChange={e=>onFile(e.target.files?.[0])} /></label>
          <button className="btn-primary" onClick={upload} disabled={!dataUrl}>Upload</button>
          {msg && <span className="text-white/70 text-sm">{msg}</span>}
        </div>
        {dataUrl && (
          <div className="mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dataUrl} alt="preview" className="h-24 rounded" />
          </div>
        )}
      </GlassCard>

      <h2 className="mt-6 mb-2 text-lg font-semibold">Files</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {files.map((u) => (
          <a key={u} href={u} target="_blank" rel="noreferrer" className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u} alt={u} className="w-full h-40 object-cover rounded-lg" />
            <div className="mt-1 text-xs break-all text-white/70">{u}</div>
          </a>
        ))}
      </div>
    </main>
  )
}

