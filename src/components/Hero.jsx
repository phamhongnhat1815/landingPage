import { useEffect, useRef } from 'react'

export default function Hero() {
  const bgRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return
      if (window.scrollY < window.innerHeight) {
        bgRef.current.style.transform = `scale(1.06) translate3d(0, ${window.scrollY * 0.18}px, 0)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" className="hero" aria-label="Hero">
      <div className="hero-bg" ref={bgRef} />
      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="hero-tag">
          <span className="hero-tag-line" />
          Save The Date
          <span className="hero-tag-line" />
        </p>

        <h1 className="hero-names">
          Văn Quang
          <span className="hero-amp">— &amp; —</span>
          Mỹ Linh
        </h1>

        <p className="hero-date">24 · 07 · 2026 &nbsp;·&nbsp; Nguyệt Viên</p>
      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <div className="hero-scroll-dot" />
        <div className="hero-scroll-dot" />
        <div className="hero-scroll-dot" />
      </div>
    </section>
  )
}
