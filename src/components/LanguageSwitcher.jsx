import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'ع' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={i18n.language?.startsWith(code) ? 'active' : ''}
          onClick={() => i18n.changeLanguage(code)}
          aria-pressed={i18n.language?.startsWith(code)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
