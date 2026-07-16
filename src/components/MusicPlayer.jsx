import { useEffect, useRef, useState } from 'react'
import { Music, VolumeX } from 'lucide-react'
import audioSrc from '../assets/snaptik.vn_7425119222491090194.mp3'

export default function MusicPlayer() {
  const audioRef  = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [shown,   setShown]   = useState(false)
  const hasTriedRef = useRef(false)

  /* ── Try autoplay immediately on mount ── */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.45
    audio.loop   = true

    const tryPlay = () => {
      audio.play()
        .then(() => {
          setPlaying(true)
          setShown(true)
        })
        .catch(() => {
          /* Autoplay blocked — show button, wait for first user interaction */
          setShown(true)
          if (!hasTriedRef.current) {
            hasTriedRef.current = true
            const resumeOnInteraction = () => {
              audio.play()
                .then(() => setPlaying(true))
                .catch(() => {})
              document.removeEventListener('click',      resumeOnInteraction)
              document.removeEventListener('touchstart', resumeOnInteraction)
              document.removeEventListener('keydown',    resumeOnInteraction)
            }
            document.addEventListener('click',      resumeOnInteraction, { once: true })
            document.addEventListener('touchstart', resumeOnInteraction, { once: true })
            document.addEventListener('keydown',    resumeOnInteraction, { once: true })
          }
        })
    }

    // Small delay so the page is interactive first
    const t = setTimeout(tryPlay, 800)
    return () => clearTimeout(t)
  }, [])

  const toggle = (e) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src={audioSrc} preload="auto" />

      {/* Floating music button */}
      <div className={`music-fab${shown ? ' visible' : ''}`}>
        {/* Ripple rings when playing */}
        {playing && (
          <>
            <span className="music-ring ring-1" />
            <span className="music-ring ring-2" />
            <span className="music-ring ring-3" />
          </>
        )}
        <button
          onClick={toggle}
          aria-label={playing ? 'Tắt nhạc' : 'Bật nhạc'}
          title={playing ? 'Tắt nhạc' : 'Bật nhạc'}
          className={`music-btn${playing ? ' playing' : ''}`}
        >
          {playing
            ? <Music size={18} />
            : <VolumeX size={18} />
          }
        </button>
      </div>
    </>
  )
}
