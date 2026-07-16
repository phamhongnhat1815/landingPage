import { useEffect, useRef } from 'react'
import heroBg from '../assets/6.jpg'

export default function Hero() {
  const bgRef      = useRef(null)
  const layerARef  = useRef(null)
  const layerBRef  = useRef(null)

  /* ── Scroll parallax ── */
  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return
      if (window.scrollY < window.innerHeight) {
        const y = window.scrollY * 0.2
        bgRef.current.style.transform = `scale(1.1) translate3d(0, ${y}px, 0)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Mouse parallax (layered depth) ── */
  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    let ticking = false
    const onMouseMove = (e) => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const rect   = hero.getBoundingClientRect()
        const cx     = rect.width  / 2
        const cy     = rect.height / 2
        const dx     = (e.clientX - rect.left  - cx) / cx   // -1 to 1
        const dy     = (e.clientY - rect.top   - cy) / cy   // -1 to 1

        if (layerARef.current) {
          layerARef.current.style.transform = `translate3d(${dx * -8}px, ${dy * -6}px, 0)`
        }
        if (layerBRef.current) {
          layerBRef.current.style.transform = `translate3d(${dx * 5}px, ${dy * 4}px, 0)`
        }
        ticking = false
      })
    }

    hero.addEventListener('mousemove', onMouseMove)
    return () => hero.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <section id="hero" className="hero" aria-label="Hero">
      {/* Background image with scroll parallax */}
      <div className="hero-bg" ref={bgRef} style={{ backgroundImage: `url(${heroBg})` }} />

      {/* Dark cinematic overlay */}
      <div className="hero-overlay" />

      {/* Ambient gold glow */}
      <div className="hero-glow" />

      {/* Mouse parallax decorative layers */}
      <div className="hero-parallax-layer" ref={layerARef} aria-hidden="true" />
      <div className="hero-parallax-layer" ref={layerBRef} aria-hidden="true" />

      {/* Floating petals */}
      <div className="hero-petals" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="petal" />
        ))}
      </div>

      {/* Content */}
      <div className="hero-content">
        {/* Eyebrow label */}
        <p className="hero-eyebrow">
          <span className="hero-eyebrow-line" />
          Save The Date
          <span className="hero-eyebrow-line" />
        </p>

        {/* Couple names */}
        <h1 className="hero-names">
          Văn Quang
          <span className="hero-amp">— &amp; —</span>
          Nguyễn Linh
        </h1>

        {/* Date & venue */}
        <p className="hero-date">24 · 07 · 2026 &nbsp;·&nbsp; Nguyệt Viên</p>

        {/* CTA */}
        <div className="hero-cta">
          <a href="#invitation" className="hero-cta-btn" aria-label="Xem thiệp mời">
            Xem Thiệp Mời
            <span className="hero-cta-chevron" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="hero-scroll-cue" aria-hidden="true">
        <div className="hero-scroll-dot" />
        <div className="hero-scroll-dot" />
        <div className="hero-scroll-dot" />
      </div>
    </section>
  )
}
