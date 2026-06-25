import { useState } from 'react'
import { MapPin, Clock, Info, Navigation, Copy, Check, Heart } from 'lucide-react'
import useReveal from '../hooks/useReveal'
import { useToast } from '../hooks/useToast'

const VENUES = [
  {
    id:       'bride',
    who:      'Nhà Cô Dâu',
    name:     'Gia đình Mỹ Linh',
    iconCls:  'bride',
    address:  'Tổ dân phố Hạnh Phúc, Phường Nguyệt Viên, Tỉnh Thanh Hoá',
    mapSrc:   'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3607.2148723609594!2d105.8359722!3d19.8039722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDQ4JzE0LjMiTiAxMDXCsDUwJzA5LjUiRQ!5e1!3m2!1svi!2s!4v1782378515822!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin',
    mapsLink: "https://www.google.com/maps/place/19%C2%B048'14.3%22N+105%C2%B050'09.5%22E/@19.803974,105.8333851,828m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d19.803974!4d105.83596?entry=ttu&g_ep=EgoyMDI2MDYyMi4wIKXMDSoASAFQAw%3D%3D",
    time:     'Lễ ăn hỏi: 08:00 sáng, 22/07/2025',
    note:     'Lễ ăn hỏi và gia đình nhà trai đến đón dâu tại địa chỉ này',
    copyAddr: 'Thôn Hạnh Phúc, Phường Nguyệt Viên, Tỉnh Thanh Hoá',
  },
  {
    id:       'groom',
    who:      'Nhà Chú Rể',
    name:     'Gia đình Văn Quang',
    iconCls:  'groom',
    address:  'Thôn Nguyệt Viên 3, phường Nguyệt Viên, tỉnh Thanh Hoá',
    mapSrc:   'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d938.4261921077747!2d105.82574516954892!3d19.810111098846978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDQ4JzM2LjQiTiAxMDXCsDQ5JzM1LjAiRQ!5e0!3m2!1svi!2s!4v1782378749999!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin',
    mapsLink: "https://www.google.com/maps/place/19%C2%B048'36.4%22N+105%C2%B049'35.0%22E/@19.8101,105.8257393,207m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d19.8101!4d105.826383?entry=ttu&g_ep=EgoyMDI2MDYyMi4wIKXMDSoASAFQAw%3D%3D",
    time:     'Lễ cưới chính: 10:00, 24/07/2026',
    note:     'Tiệc cưới được tổ chức tại gia đình nhà trai',
    copyAddr: 'Thôn Nguyệt Viên 3, Phường Nguyệt Viên, tỉnh Thanh Hoá',
  },
]

export default function Venues() {
  const headerRef = useReveal()
  const showToast = useToast()

  return (
    <section id="venues" className="venues" aria-label="Địa điểm tổ chức">
      <div className="container">
        <div ref={headerRef} className="venues-header reveal">
          <p className="section-label">Địa điểm</p>
          <h2 className="section-title">Nơi Tổ Chức</h2>
          <div className="divider">
            <span className="divider-dot" aria-hidden="true" />
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.5rem', fontWeight: 300 }}>
            Hai địa điểm quan trọng trong hành trình ngày cưới của chúng tôi
          </p>
        </div>

        <div className="venues-grid">
          {VENUES.map((v, i) => (
            <VenueCard key={v.id} venue={v} delay={i * 0.15} showToast={showToast} />
          ))}
        </div>
      </div>
    </section>
  )
}

function VenueCard({ venue: v, delay, showToast }) {
  const ref = useReveal(delay)
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(v.copyAddr)
      .then(() => {
        showToast('Đã sao chép địa chỉ!')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => showToast('Không thể sao chép.'))
  }

  return (
    <div ref={ref} className="venue-card reveal">
      {/* Header */}
      <div className="venue-card-header">
        <div className={`venue-card-icon ${v.iconCls}`}>
          <Heart size={20} className={v.id === 'bride' ? 'text-bride-heart' : 'text-groom-heart'} fill="currentColor" />
        </div>
        <div>
          <p className="venue-card-who">{v.who}</p>
          <p className="venue-card-name">{v.name}</p>
        </div>
      </div>

      {/* Embedded map */}
      <iframe
        className="venue-map"
        title={`Bản đồ ${v.who}`}
        src={v.mapSrc}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Details */}
      <div className="venue-card-body">
        <div className="venue-detail">
          <MapPin size={18} className="venue-detail-icon text-gold" />
          <p className="venue-detail-text">{v.address}</p>
        </div>
        <div className="venue-detail">
          <Clock size={18} className="venue-detail-icon text-gold" />
          <p className="venue-detail-text"><strong>{v.time}</strong></p>
        </div>
        <div className="venue-detail">
          <Info size={18} className="venue-detail-icon text-gold" />
          <p className="venue-detail-text">{v.note}</p>
        </div>

        <div className="venue-card-actions">
          <a
            className="btn btn-primary"
            href={v.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Xem chỉ đường đến ${v.who} trên Google Maps`}
          >
            <Navigation size={14} />
            Chỉ Đường
          </a>
          <button className="btn btn-outline" onClick={handleCopy} aria-label="Sao chép địa chỉ">
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Đã chép' : 'Sao Chép'}
          </button>
        </div>
      </div>
    </div>
  )
}
