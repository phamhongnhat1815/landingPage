import { useState, useEffect, useCallback } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['gallery', 'schedule', 'venues', 'gift']
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger active state when section passes through middle of the viewport
      threshold: 0,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const navItems = [
    { href: '#gallery',  label: 'Ảnh cưới', id: 'gallery' },
    { href: '#schedule', label: 'Lịch trình', id: 'schedule' },
    { href: '#venues',   label: 'Địa điểm', id: 'venues' },
    { href: '#gift',     label: 'Mừng Cưới', id: 'gift' },
  ]

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Điều hướng chính">
        <a className="nav-brand" href="#hero" aria-label="Trang chủ">Q &amp; L</a>

        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.href}>
              <a 
                href={item.href} 
                className={activeSection === item.id ? 'active' : ''}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`mobile-nav-overlay ${menuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu điều hướng"
      >
        <div className="mobile-nav-links">
          {navItems.map((item, idx) => (
            <a 
              key={item.href} 
              href={item.href} 
              onClick={closeMenu}
              className={activeSection === item.id ? 'active' : ''}
              style={{ transitionDelay: `${idx * 0.08}s` }}
            >
              {item.label}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={closeMenu}
            style={{ transitionDelay: `${navItems.length * 0.08}s` }}
          >
            Liên hệ
          </a>
        </div>
      </div>
    </>
  )
}

