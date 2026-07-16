import { useState, useEffect, useRef, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import useReveal from '../hooks/useReveal'
import Divider from './Divider'

import photo1 from '../assets/1.jpg'
import photo2 from '../assets/2.jpg'
import photo3 from '../assets/3.jpg'
import photo4 from '../assets/4.jpg'
import photo5 from '../assets/5.jpg'

const PHOTOS = [
  { src: photo1, alt: 'Khoảnh khắc 1' },
  { src: photo2, alt: 'Khoảnh khắc 2' },
  { src: photo3, alt: 'Khoảnh khắc 3' },
  { src: photo4, alt: 'Khoảnh khắc 4' },
  { src: photo5, alt: 'Khoảnh khắc 5' },
]

const N = PHOTOS.length

// Modular arithmetic helper
const mod = (n, m) => ((n % m) + m) % m

export default function Gallery() {
  const headerRef = useReveal()
  const carouselRef = useReveal(0.2)

  const [active, setActive]       = useState(0)      // current center index
  const [animDir, setAnimDir]     = useState(null)   // 'left' | 'right'
  const [lightbox, setLightbox]   = useState(null)
  const isDragging = useRef(false)
  const dragStart  = useRef(0)
  const autoTimer  = useRef(null)

  /* ── Auto-advance ── */
  const startAuto = useCallback(() => {
    clearInterval(autoTimer.current)
    autoTimer.current = setInterval(() => goNext(), 4000)
  }, [])

  useEffect(() => {
    startAuto()
    return () => clearInterval(autoTimer.current)
  }, [startAuto])

  const goPrev = useCallback(() => {
    setAnimDir('right')
    setActive(prev => mod(prev - 1, N))
    startAuto()
  }, [startAuto])

  const goNext = useCallback(() => {
    setAnimDir('left')
    setActive(prev => mod(prev + 1, N))
    startAuto()
  }, [startAuto])

  const goTo = useCallback((i) => {
    setAnimDir(i > active ? 'left' : 'right')
    setActive(i)
    startAuto()
  }, [active, startAuto])

  /* ── Keyboard ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'Escape')     setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  /* ── Touch/drag swipe ── */
  const onPointerDown = (e) => {
    isDragging.current = true
    dragStart.current  = e.clientX ?? e.touches?.[0]?.clientX
  }
  const onPointerUp = (e) => {
    if (!isDragging.current) return
    isDragging.current = false
    const dx = (e.clientX ?? e.changedTouches?.[0]?.clientX) - dragStart.current
    if (Math.abs(dx) > 40) dx < 0 ? goNext() : goPrev()
  }

  /* ── Build visible slots: [left2, left1, center, right1, right2] ── */
  const slots = [-2, -1, 0, 1, 2].map(offset => ({
    offset,
    index: mod(active + offset, N),
    photo: PHOTOS[mod(active + offset, N)],
  }))

  return (
    <section id="gallery" className="gallery" aria-label="Bộ ảnh cưới">
      <div className="container">
        <div ref={headerRef} className="gallery-header reveal">
          <p className="section-label">Bộ ảnh cưới</p>
          <h2 className="section-title">Khoảnh Khắc Hạnh Phúc</h2>
          <Divider />
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="gallery-carousel reveal"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchEnd={onPointerUp}
      >
        <button className="gallery-nav prev" onClick={goPrev} aria-label="Ảnh trước">
          <ChevronLeft size={26} />
        </button>

        <div className="gallery-stage">
          {slots.map(({ offset, index, photo }) => {
            const isCenter   = offset === 0
            const isAdjacent = Math.abs(offset) === 1
            const isFar      = Math.abs(offset) === 2

            return (
              <div
                key={index}
                className={[
                  'gallery-card',
                  isCenter   ? 'active'    : '',
                  isAdjacent ? 'adjacent'  : '',
                  isFar      ? 'far'       : '',
                  offset < 0 ? 'left-side' : offset > 0 ? 'right-side' : '',
                ].filter(Boolean).join(' ')}
                style={{ '--offset': offset }}
                onClick={() => isCenter ? setLightbox(index) : goTo(index)}
                role="button"
                tabIndex={isCenter ? 0 : -1}
                aria-label={isCenter ? `Mở rộng ${photo.alt}` : `Chuyển đến ${photo.alt}`}
              >
                <img src={photo.src} alt={photo.alt} draggable="false" />
                {isCenter && (
                  <div className="gallery-card-overlay">
                    <span className="gallery-open-hint">Xem chi tiết</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <button className="gallery-nav next" onClick={goNext} aria-label="Ảnh sau">
          <ChevronRight size={26} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="gallery-dots" role="tablist">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            className={`gallery-dot${i === active ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Ảnh ${i + 1}`}
            role="tab"
            aria-selected={i === active}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Ảnh phóng to"
        >
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Đóng">
            <X size={20} />
          </button>

          <button
            className="lightbox-btn prev"
            onClick={e => { e.stopPropagation(); setLightbox(mod(lightbox - 1, N)) }}
            aria-label="Ảnh trước"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
            <img src={PHOTOS[lightbox].src} alt={PHOTOS[lightbox].alt} />
            <p className="lightbox-caption">{PHOTOS[lightbox].alt}</p>
          </div>

          <button
            className="lightbox-btn next"
            onClick={e => { e.stopPropagation(); setLightbox(mod(lightbox + 1, N)) }}
            aria-label="Ảnh sau"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  )
}
