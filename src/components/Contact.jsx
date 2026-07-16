import useReveal from '../hooks/useReveal'

const CONTACTS = [
  { role: 'Chú rể',        name: 'Văn Quang',   phone: '0865619974' },
  { role: 'Cô dâu',        name: 'Nguyễn Linh',    phone: '0999999999' },
]

export default function Contact() {
  const ref1 = useReveal()
  const ref2 = useReveal(0.15)
  const ref3 = useReveal(0.3)

  return (
    <section id="contact" className="contact" aria-label="Thông tin liên hệ">
      <div className="container">
        <div ref={ref1} className="reveal">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.25)' }}>Liên hệ</p>
          <p className="contact-names">Văn Quang &amp; Mỹ Linh</p>
          <p className="contact-date-line">24 · 07 · 2026 &nbsp;·&nbsp; Nguyệt Viên</p>
        </div>

        <div ref={ref2} className="contact-cards reveal">
          {CONTACTS.map(c => (
            <div key={c.name} className="contact-card">
              <p className="contact-card-role">{c.role}</p>
              <p className="contact-card-name">{c.name}</p>
              <p className="contact-card-phone">{c.phone}</p>
            </div>
          ))}
        </div>

        <div ref={ref3} className="reveal">
          <p className="footer-quote">Chúng tôi mong chờ ngày vui bên bạn!</p>
          <p className="footer-copy">© 2025 Văn Quang &amp; Mỹ Linh · Made with 💛</p>
        </div>
      </div>
    </section>
  )
}
