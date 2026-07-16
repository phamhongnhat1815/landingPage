import { useState, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import useReveal from '../hooks/useReveal'
import Divider from './Divider'

const PHOTOS = [
  { src: '/src/assets/1.jpg', alt: 'Wedding Photo 1' },
  { src: '/src/assets/2.jpg', alt: 'Wedding Photo 2' },
  { src: '/src/assets/3.jpg', alt: 'Wedding Photo 3' },
  { src: '/src/assets/4.jpg', alt: 'Wedding Photo 4' },
  { src: '/src/assets/5.jpg', alt: 'Wedding Photo 5' },
]

export default function Gallery() {
  const headerRef  = useReveal()
  const gridRef    = useReveal(0.2)
  const [photoIndex, setPhotoIndex] = useState(null)
  const sliderRef  = useRef(null)

  const openLightbox  = (i)  => setPhotoIndex(i)
  const closeLightbox = ()   => setPhotoIndex(null)

  const showPrev = (e) => {
    e.stopPropagation()
    setPhotoIndex(prev => (prev === 0 ? PHOTOS.length - 1 : prev - 1))
  }
  const showNext = (e) => {
    e.stopPropagation()
    setPhotoIndex(prev => (prev === PHOTOS.length - 1 ? 0 : prev + 1))
  }

  const scrollLeft  = () => sliderRef.current?.scrollBy({ left: -340, behavior: 'smooth' })
  const scrollRight = () => sliderRef.current?.scrollBy({ left:  340, behavior: 'smooth' })

  return (
    <section id="gallery" className="gallery" aria-label="Bộ ảnh cưới">
      <div className="container">
        <div ref={headerRef} className="gallery-header reveal">
          <p className="section-label">Bộ ảnh cưới</p>
          <h2 className="section-title">Khoảnh Khắc Hạnh Phúc</h2>
          <Divider />
        </div>

        <div ref={gridRef} className="gallery-slider-container reveal">
          <button className="slider-nav-btn prev" onClick={scrollLeft} aria-label="Cuộn trái">
            <ChevronLeft size={22} />
          </button>

          <div className="gallery-slider" ref={sliderRef}>
            {PHOTOS.map((p, i) => (
              <div
                key={i}
                className="gallery-slider-item"
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                aria-label={`Xem ảnh ${i + 1}`}
                onKeyDown={e => e.key === 'Enter' && openLightbox(i)}
              >
                <img src={p.src} alt={p.alt} loading="lazy" />
                <div className="gallery-hover-overlay">
                  <span className="gallery-hover-text">Xem chi tiết</span>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-nav-btn next" onClick={scrollRight} aria-label="Cuộn phải">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {photoIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Ảnh phóng to"
        >
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Đóng">
            <X size={20} />
          </button>

          <button className="lightbox-btn prev" onClick={showPrev} aria-label="Ảnh trước">
            <ChevronLeft size={28} />
          </button>

          <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
            <img src={PHOTOS[photoIndex].src} alt={PHOTOS[photoIndex].alt} />
            <p className="lightbox-caption">{PHOTOS[photoIndex].alt}</p>
          </div>

          <button className="lightbox-btn next" onClick={showNext} aria-label="Ảnh sau">
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  )
}
