import useReveal from '../hooks/useReveal'
import Divider from './Divider'

const PHOTOS = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByMOHDsXHpmmeQcWJwddXinatB_YKaoPFuuWgL2NSjfXwMSgASTrM0haISTTI2JCTGJkN74s_gobt0gW5xuboRE2ad8UsKJVbyJPLWU3PeoGYHpwlf37VFrohFSi9Z0KjAEuofWkXuNRy6B38kG8v3eOH8FnGwSSc5KfyNBTG0MPGCb-PD2nhM6znK8D5rI0aVnQLjMOEHRxKoxwxwmTf74EifGQmMNdtDqa6qLSNeZvC-4Z_sTXUaG1-7AFfVb_-SR4aQzzW5PrZV',
    alt: 'Ảnh cưới 1 – Văn Hùng và Mỹ Linh',
    className: 'gallery-item tall',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByMOHDsXHpmmeQcWJwddXinatB_YKaoPFuuWgL2NSjfXwMSgASTrM0haISTTI2JCTGJkN74s_gobt0gW5xuboRE2ad8UsKJVbyJPLWU3PeoGYHpwlf37VFrohFSi9Z0KjAEuofWkXuNRy6B38kG8v3eOH8FnGwSSc5KfyNBTG0MPGCb-PD2nhM6znK8D5rI0aVnQLjMOEHRxKoxwxwmTf74EifGQmMNdtDqa6qLSNeZvC-4Z_sTXUaG1-7AFfVb_-SR4aQzzW5PrZV',
    alt: 'Ảnh cưới 2',
    className: 'gallery-item wide',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByMOHDsXHpmmeQcWJwddXinatB_YKaoPFuuWgL2NSjfXwMSgASTrM0haISTTI2JCTGJkN74s_gobt0gW5xuboRE2ad8UsKJVbyJPLWU3PeoGYHpwlf37VFrohFSi9Z0KjAEuofWkXuNRy6B38kG8v3eOH8FnGwSSc5KfyNBTG0MPGCb-PD2nhM6znK8D5rI0aVnQLjMOEHRxKoxwxwmTf74EifGQmMNdtDqa6qLSNeZvC-4Z_sTXUaG1-7AFfVb_-SR4aQzzW5PrZV',
    alt: 'Ảnh cưới 3',
    className: 'gallery-item',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy7SsOrnbSxVT7_Nq4juervwK2qQne1klJRaTJ-NG3t2Q6jnTAe4Zr0qGPl72ZuA15MHtlPNFjmqJurGM3voVijzDhgeWKOQY-j2oYU_NBENqWcrAv_XmndN4HziWGiiOcNT9y-fKCcRRbCO2E4ftL3QcNjG6TN5i1siceyRNJegWVxrzsOsTzn0ykylqzXSqLMZxHJeK0bCAe2UqBBc3p_f63Kq_1r8mKcwaT0FqtIpVmB-LtBixlF6X0kJt5g9JNTEA3qLKKh1oN',
    alt: 'Ảnh cưới 4',
    className: 'gallery-item',
  },
]

export default function Gallery() {
  const headerRef = useReveal()
  const gridRef   = useReveal(0.2)

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
            <div key={i} className={p.className}>
              <img src={p.src} alt={p.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

