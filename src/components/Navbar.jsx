import { useState, useEffect, useCallback } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const navItems = [
    { href: '#gallery',  label: 'Ảnh cưới' },
    { href: '#schedule', label: 'Lịch trình' },
    { href: '#venues',   label: 'Địa điểm' },
    { href: '#gift',     label: 'Mừng Cưới' },
    { href: '#rsvp',     label: 'RSVP' },
  ]

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Điều hướng chính">
        <a className="nav-brand" href="#hero" aria-label="Trang chủ">Q &amp; L</a>

        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
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
        {navItems.map(item => (
          <a key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <a href="#contact" onClick={closeMenu}>Liên hệ</a>
      </div>
    </>
  )
}
