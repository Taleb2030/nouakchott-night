import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { pauseVideo } from '../utils/videoPlayback'
import { cardReveal, viewport, ease } from '../animations/motion'
import { assetUrl } from '../utils/assetUrl'

const VIDEOS = [
  { src: assetUrl('assets/videos/video1.mp4'), id: 1 },
  { src: assetUrl('assets/videos/video2.mp4'), id: 2 },
  { src: assetUrl('assets/videos/video3.mp4'), id: 3 },
]

let activeGalleryVideo = null

function VideoCard({ src, index, label }) {
  const { t } = useTranslation()
  const videoRef = useRef(null)
  const [hasVideo, setHasVideo] = useState(true)
  const [withSound, setWithSound] = useState(false)

  const autoPlayMuted = () => {
    const video = videoRef.current
    if (!video || !hasVideo) return
    video.muted = true
    video.play().catch(() => {})
  }

  useEffect(() => {
    const timer = setTimeout(autoPlayMuted, 300)
    return () => clearTimeout(timer)
  }, [hasVideo])

  const handleClick = () => {
    const video = videoRef.current
    if (!video || !hasVideo) return

    if (withSound && activeGalleryVideo === video) {
      pauseVideo(video)
      activeGalleryVideo = null
      setWithSound(false)
      return
    }

    if (activeGalleryVideo && activeGalleryVideo !== video) {
      pauseVideo(activeGalleryVideo)
      activeGalleryVideo.muted = true
    }

    activeGalleryVideo = video
    video.muted = false
    video
      .play()
      .then(() => setWithSound(true))
      .catch(() => {
        video.muted = true
        setWithSound(false)
      })
  }

  return (
    <motion.article
      className="gallery__card"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={cardReveal}
      transition={{ duration: 0.85, ease, delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.35, ease } }}
    >
      <button
        type="button"
        className={`gallery__media ${withSound ? 'gallery__media--active' : ''}`}
        onClick={handleClick}
        aria-label={withSound ? t('media.soundOff') : t('media.tapForSound')}
      >
        {hasVideo ? (
          <>
            <motion.video
              ref={videoRef}
              src={src}
              loop
              playsInline
              muted
              preload="metadata"
              className={`gallery__video ${withSound ? 'gallery__video--playing' : ''}`}
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={viewport}
              transition={{ duration: 1.2, ease, delay: index * 0.15 + 0.1 }}
              onError={() => setHasVideo(false)}
            />
            <span className="gallery__play-overlay" aria-hidden>
              <span className="gallery__play-icon">{withSound ? '🔊' : '▶'}</span>
              <span className="gallery__play-text">
                {withSound ? t('media.soundOff') : t('media.tapForSound')}
              </span>
            </span>
          </>
        ) : null}
        <div className={`gallery__placeholder ${hasVideo ? '' : 'gallery__placeholder--visible'}`}>
          <span className="gallery__placeholder-num">0{index + 1}</span>
          <p>{label}</p>
        </div>
        <div className="gallery__shine" aria-hidden />
      </button>
    </motion.article>
  )
}

export default function Gallery() {
  const { t } = useTranslation()

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <SectionHeader
          label={t('gallery.label')}
          title={t('gallery.title')}
          subtitle={t('gallery.subtitle')}
        />

        <div className="gallery__grid">
          {VIDEOS.map((video, i) => (
            <VideoCard
              key={video.id}
              src={video.src}
              index={i}
              label={t('gallery.subtitle')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
