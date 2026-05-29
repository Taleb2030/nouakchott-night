import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { cardReveal, viewport, transition, ease } from '../animations/motion'

const VIDEOS = [
  { src: '/assets/videos/video1.mp4', id: 1 },
  { src: '/assets/videos/video2.mp4', id: 2 },
  { src: '/assets/videos/video3.mp4', id: 3 },
]

function playWithSound(video) {
  video.muted = false
  return video.play()
}

function pauseVideo(video) {
  video.pause()
  video.currentTime = 0
}

function VideoCard({ src, index, label }) {
  const { t } = useTranslation()
  const videoRef = useRef(null)
  const [hasVideo, setHasVideo] = useState(true)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    const video = videoRef.current
    if (!video) return
    playWithSound(video)
      .then(() => setPlaying(true))
      .catch(() => {
        video.muted = true
        video.play().then(() => setPlaying(true))
      })
  }

  const handlePause = () => {
    const video = videoRef.current
    if (!video) return
    pauseVideo(video)
    setPlaying(false)
  }

  const handleClick = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) handlePlay()
    else handlePause()
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
      <div
        className="gallery__media"
        onMouseEnter={handlePlay}
        onMouseLeave={handlePause}
      >
        {hasVideo ? (
          <>
            <motion.video
              ref={videoRef}
              src={src}
              loop
              playsInline
              preload="metadata"
              className={`gallery__video ${playing ? 'gallery__video--playing' : ''}`}
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={viewport}
              transition={{ duration: 1.2, ease, delay: index * 0.15 + 0.1 }}
              onError={() => setHasVideo(false)}
            />
            <button
              type="button"
              className="gallery__play-hint"
              onClick={handleClick}
              aria-label={t('media.tapForSound')}
            >
              {playing ? '🔊' : '▶'}
              <span>{t('media.tapForSound')}</span>
            </button>
          </>
        ) : null}
        <div className={`gallery__placeholder ${hasVideo ? '' : 'gallery__placeholder--visible'}`}>
          <span className="gallery__placeholder-num">0{index + 1}</span>
          <p>{label}</p>
        </div>
        <div className="gallery__shine" aria-hidden />
      </div>
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
