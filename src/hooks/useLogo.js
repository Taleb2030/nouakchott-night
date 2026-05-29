import { useEffect, useState } from 'react'

export const LOGO_CANDIDATES = [
  '/assets/logo.png',
  '/assets/logo.jpg',
  '/assets/logo.jpeg',
  '/assets/logo.webp',
  '/assets/logo.svg',
]

function probeImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

export function useLogo() {
  const [logoSrc, setLogoSrc] = useState(LOGO_CANDIDATES[LOGO_CANDIDATES.length - 1])

  useEffect(() => {
    let cancelled = false

    async function resolveLogo() {
      for (const src of LOGO_CANDIDATES) {
        const found = await probeImage(src)
        if (cancelled) return
        if (found) {
          setLogoSrc(found)
          const icon =
            document.querySelector("link[rel='icon']") ||
            document.querySelector("link[rel='shortcut icon']")
          if (icon) {
            icon.href = found
            icon.type = found.endsWith('.svg') ? 'image/svg+xml' : 'image/png'
          }
          return
        }
      }
    }

    resolveLogo()
    return () => {
      cancelled = true
    }
  }, [])

  return logoSrc
}
