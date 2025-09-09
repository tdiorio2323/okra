export const countryTextures = {
  colombia: '/images/red_tufted_texture.jpg',
} as const

export type CountryKey = keyof typeof countryTextures

export function getCountryTexture(country: string): string | undefined {
  const key = country.toLowerCase().trim() as CountryKey
  return countryTextures[key]
}

