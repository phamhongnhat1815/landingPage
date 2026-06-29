import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import useReveal from '../hooks/useReveal'
import Divider from './Divider'

const PHOTOS = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByMOHDsXHpmmeQcWJwddXinatB_YKaoPFuuWgL2NSjfXwMSgASTrM0haISTTI2JCTGJkN74s_gobt0gW5xuboRE2ad8UsKJVbyJPLWU3PeoGYHpwlf37VFrohFSi9Z0KjAEuofWkXuNRy6B38kG8v3eOH8FnGwSSc5KfyNBTG0MPGCb-PD2nhM6znK8D5rI0aVnQLjMOEHRxKoxwxwmTf74EifGQmMNdtDqa6qLSNeZvC-4Z_sTXUaG1-7AFfVb_-SR4aQzzW5PrZV',
    alt: 'Khoảnh khắc lãng mạn – Văn Quang và Mỹ Linh',
    className: 'gallery-item tall',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByMOHDsXHpmmeQcWJwddXinatB_YKaoPFuuWgL2NSjfXwMSgASTrM0haISTTI2JCTGJkN74s_gobt0gW5xuboRE2ad8UsKJVbyJPLWU3PeoGYHpwlf37VFrohFSi9Z0KjAEuofWkXuNRy6B38kG8v3eOH8FnGwSSc5KfyNBTG0MPGCb-PD2nhM6znK8D5rI0aVnQLjMOEHRxKoxwxwmTf74EifGQmMNdtDqa6qLSNeZvC-4Z_sTXUaG1-7AFfVb_-SR4aQzzW5PrZV',
    alt: 'Nụ cười hạnh phúc của cô dâu chú rể',
    className: 'gallery-item wide',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByMOHDsXHpmmeQcWJwddXinatB_YKaoPFuuWgL2NSjfXwMSgASTrM0haISTTI2JCTGJkN74s_gobt0gW5xuboRE2ad8UsKJVbyJPLWU3PeoGYHpwlf37VFrohFSi9Z0KjAEuofWkXuNRy6B38kG8v3eOH8FnGwSSc5KfyNBTG0MPGCb-PD2nhM6znK8D5rI0aVnQLjMOEHRxKoxwxwmTf74EifGQmMNdtDqa6qLSNeZvC-4Z_sTXUaG1-7AFfVb_-SR4aQzzW5PrZV',
    alt: 'Bên nhau trọn đời',
    className: 'gallery-item',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy7SsOrnbSxVT7_Nq4juervwK2qQne1klJRaTJ-NG3t2Q6jnTAe4Zr0qGPl72ZuA15MHtlPNFjmqJurGM3voVijzDhgeWKOQY-j2oYU_NBENqWcrAv_XmndN4HziWGiiOcNT9y-fKCcRRbCO2E4ftL3QcNjG6TN5i1siceyRNJegWVxrzsOsTzn0ykylqzXSqLMZxHJeK0bCAe2UqBBc3p_f63Kq_1r8mKcwaT0FqtIpVmB-LtBixlF6X0kJt5g9JNTEA3qLKKh1oN',
    alt: 'Ánh mắt trìu mến dành cho nhau',
    className: 'gallery-item',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByMOHDsXHpmmeQcWJwddXinatB_YKaoPFuuWgL2NSjfXwMSgASTrM0haISTTI2JCTGJkN74s_gobt0gW5xuboRE2ad8UsKJVbyJPLWU3PeoGYHpwlf37VFrohFSi9Z0KjAEuofWkXuNRy6B38kG8v3eOH8FnGwSSc5KfyNBTG0MPGCb-PD2nhM6znK8D5rI0aVnQLjMOEHRxKoxwxwmTf74EifGQmMNdtDqa6qLSNeZvC-4Z_sTXUaG1-7AFfVb_-SR4aQzzW5PrZV',
    alt: 'Tay trong tay bước vào lễ đường',
    className: 'gallery-item wide',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy7SsOrnbSxVT7_Nq4juervwK2qQne1klJRaTJ-NG3t2Q6jnTAe4Zr0qGPl72ZuA15MHtlPNFjmqJurGM3voVijzDhgeWKOQY-j2oYU_NBENqWcrAv_XmndN4HziWGiiOcNT9y-fKCcRRbCO2E4ftL3QcNjG6TN5i1siceyRNJegWVxrzsOsTzn0ykylqzXSqLMZxHJeK0bCAe2UqBBc3p_f63Kq_1r8mKcwaT0FqtIpVmB-LtBixlF6X0kJt5g9JNTEA3qLKKh1oN',
    alt: 'Khoảnh khắc ngọt ngào đáng nhớ',
    className: 'gallery-item',
  },
]

export default function Gallery() {
  const headerRef = useReveal()
  const gridRef   = useReveal(0.2)
  const [photoIndex, setPhotoIndex] = useState(null)

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

  return (
    <section id="gallery" className="gallery" aria-label="Bộ ảnh cưới">
      <div className="container">
        <div ref={headerRef} className="gallery-header reveal">
          <p className="section-label">Bộ ảnh cưới</p>
          <h2 className="section-title">Khoảnh Khắc Hạnh Phúc</h2>
          <Divider />
        </div>

        <div ref={gridRef} className="gallery-grid reveal">
          {PHOTOS.map((p, i) => (
            <div key={i} className={p.className} onClick={() => openLightbox(i)} style={{ cursor: 'pointer' }}>
              <img src={p.src} alt={p.alt} loading="lazy" />
              <div className="gallery-hover-overlay">
                <span className="gallery-hover-text">Xem chi tiết</span>
              </div>
            </div>
          ))}
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


