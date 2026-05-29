import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'ar', label: 'العربية', short: 'ع' },
]

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  const current =
    LANGUAGES.find((lang) => i18n.language?.startsWith(lang.code)) ?? LANGUAGES[0]

  useEffect(() => {
    if (!open) return

    const close = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false)
    })

    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  const selectLanguage = (code) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div className="lang-dropdown" ref={rootRef}>
      <button
        type="button"
        className="lang-dropdown__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('nav.language')}
      >
        <span className="lang-dropdown__icon" aria-hidden>
          🌐
        </span>
        <span className="lang-dropdown__current">{current.short}</span>
        <span className={`lang-dropdown__chevron ${open ? 'lang-dropdown__chevron--open' : ''}`} aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <ul className="lang-dropdown__menu" role="listbox" aria-label={t('nav.language')}>
          {LANGUAGES.map(({ code, label }) => (
            <li key={code} role="option" aria-selected={i18n.language?.startsWith(code)}>
              <button
                type="button"
                className={i18n.language?.startsWith(code) ? 'active' : ''}
                onClick={() => selectLanguage(code)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
