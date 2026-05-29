/** Try to play video; use sound when the browser allows it */
export async function playVideo(video, withSound = true) {
  if (!video) return { playing: false, hasSound: false }

  if (withSound) {
    video.muted = false
    try {
      await video.play()
      return { playing: true, hasSound: true }
    } catch {
      /* fall through — try muted */
    }
  }

  video.muted = true
  try {
    await video.play()
    return { playing: true, hasSound: false }
  } catch {
    return { playing: false, hasSound: false }
  }
}

export function pauseVideo(video, reset = true) {
  if (!video) return
  video.pause()
  if (reset) video.currentTime = 0
}

export function unmuteVideo(video) {
  if (!video) return Promise.resolve(false)
  video.muted = false
  return video.play().then(() => true).catch(() => {
    video.muted = true
    return false
  })
}
