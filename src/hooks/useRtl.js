import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function useRtl() {
  const { i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
  }, [i18n.language, isRtl])

  return isRtl
}
