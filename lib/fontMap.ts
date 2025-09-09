export const fontVars: Record<string, string> = {
  'Inter': 'var(--font-inter)',
  'Playfair Display': 'var(--font-playfair)',
  'Space Mono': 'var(--font-space-mono)',
  'Poppins': 'var(--font-poppins)',
  'Montserrat': 'var(--font-montserrat)',
  'Roboto': 'var(--font-roboto)',
  'Lato': 'var(--font-lato)',
  'Oswald': 'var(--font-oswald)',
  'Raleway': 'var(--font-raleway)',
}

export function fontVarFor(name?: string | null): string | undefined {
  if (!name) return undefined
  return fontVars[name]
}

