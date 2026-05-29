import { useTranslation } from 'react-i18next'

export default function SoundToggle({ muted, onToggle, className = '' }) {
  const { t } = useTranslation()

  return (
    <button
      type="button"
      className={`sound-toggle ${className}`}
      onClick={onToggle}
      aria-pressed={!muted}
      aria-label={muted ? t('media.soundOn') : t('media.soundOff')}
      title={muted ? t('media.soundOn') : t('media.soundOff')}
    >
      <span className="sound-toggle__icon" aria-hidden>
        {muted ? '🔇' : '🔊'}
      </span>
      <span className="sound-toggle__label">
        {muted ? t('media.soundOn') : t('media.soundOff')}
      </span>
    </button>
  )
}
