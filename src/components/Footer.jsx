import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Logo from './Logo'
import { fadeUpSoft, viewport, transition } from '../animations/motion'
import { assetUrl } from '../utils/assetUrl'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const socialLinks = [
    { id: 'snapchat', label: 'Snapchat', href: '#', icon: assetUrl('Icons8/snapchat.svg') },
    { id: 'tiktok', label: 'TikTok', href: '#', icon: assetUrl('Icons8/tiktok.svg') },
    { id: 'facebook', label: 'Facebook', href: '#', icon: assetUrl('Icons8/facebook.svg') },
    { id: 'whatsapp', label: 'WhatsApp', href: '#', icon: assetUrl('Icons8/whatsapp.svg') },
  ]

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUpSoft}
      transition={transition}
    >
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo className="footer__logo" alt="" />
          <p className="footer__tagline">{t('footer.tagline')}</p>
        </div>

        <div className="footer__social">
          <p className="footer__social-label">{t('footer.followUs')}</p>
          <div className="footer__social-links">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="footer__social-link"
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={link.icon} alt={link.label} className="footer__social-icon" />
              </a>
            ))}
          </div>
        </div>

        <p className="footer__copy">
          © {year} Nouakchott Night. {t('footer.rights')}
        </p>
      </div>
    </motion.footer>
  )
}
