import { useState, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import useReveal from '../hooks/useReveal'
import Divider from './Divider'

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', alt: 'Wedding Photo 1' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', alt: 'Wedding Photo 2' },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80', alt: 'Wedding Photo 3' },
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80', alt: 'Wedding Photo 4' },
  { src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80', alt: 'Wedding Photo 5' },
  { src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80', alt: 'Wedding Photo 6' },
  { src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80', alt: 'Wedding Photo 7' },
  { src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80', alt: 'Wedding Photo 8' },
  { src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80', alt: 'Wedding Photo 9' },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80', alt: 'Wedding Photo 10' },
]

export default function Gallery() {
  const headerRef = useReveal()
  const gridRef   = useReveal(0.2)
  const [photoIndex, setPhotoIndex] = useState(null)
  const sliderRef = useRef(null)

  const openLightbox = (index) => setPhotoIndex(index)
  const closeLightbox = () => setPhotoIndex(null)

  const showPrev = (e) => {
    e.stopPropagation()
    setPhotoIndex((prev) => (prev === 0 ? PHOTOS.length - 1 : prev - 1))
  }

  const showNext = (e) => {
    e.stopPropagation()
    setPhotoIndex((prev) => (prev === PHOTOS.length - 1 ? 0 : prev + 1))
  }

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

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
            <ChevronLeft size={24} />
          </button>
          
          <div className="gallery-slider" ref={sliderRef}>
            {PHOTOS.map((p, i) => (
              <div key={i} className="gallery-slider-item" onClick={() => openLightbox(i)}>
                <img src={p.src} alt={p.alt} loading="lazy" />
                <div className="gallery-hover-overlay">
                  <span className="gallery-hover-text">Xem chi tiết</span>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-nav-btn next" onClick={scrollRight} aria-label="Cuộn phải">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {photoIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Đóng ảnh phóng to">
            <X size={24} />
          </button>

          <button className="lightbox-btn prev" onClick={showPrev} aria-label="Ảnh trước">
            <ChevronLeft size={36} />
          </button>

          <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <img src={PHOTOS[photoIndex].src} alt={PHOTOS[photoIndex].alt} />
            <p className="lightbox-caption">{PHOTOS[photoIndex].alt}</p>
          </div>

          <button className="lightbox-btn next" onClick={showNext} aria-label="Ảnh sau">
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </section>
  )
}


