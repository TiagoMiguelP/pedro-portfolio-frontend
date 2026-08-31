const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337'

export async function fetchStrapi<T>(path: string): Promise<T> {
  const url = new URL(path, STRAPI_URL.endsWith('/') ? STRAPI_URL : `${STRAPI_URL}/`)

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`)
  }

  return (await response.json()) as T
}

export function getMediaUrl(url?: string | null): string | null {
  if (!url) return null

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  return `${STRAPI_URL.replace(/\/$/, '')}${url}`
}
