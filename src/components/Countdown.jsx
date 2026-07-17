import { useState, useEffect } from 'react'
import useReveal from '../hooks/useReveal'

const WEDDING_DATE = new Date('2026-07-24T00:00:00+07:00').getTime()

function padTwo(n) {
  return String(Math.max(0, n)).padStart(2, '0')
}

function getTimeLeft() {
  const diff = WEDDING_DATE - Date.now()
  if (diff <= 0) return null
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  }
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft)
  const headerRef = useReveal()
  const gridRef   = useReveal(0.2)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="countdown" className="countdown" aria-label="Đếm ngược đến ngày cưới">
      <div className="container">
        <div ref={headerRef} className="countdown-header reveal">
          <p className="section-label" style={{ color: 'var(--gold-light)' }}>
            Đếm ngược đến ngày cưới
          </p>
          <h2 className="section-title light">Còn Bao Lâu Nữa?</h2>
        </div>

        <div
          ref={gridRef}
          className="countdown-grid reveal"
          aria-live="polite"
          aria-atomic="true"
        >
          {time ? (
            <>
              <CountItem value={padTwo(time.days)}    label="Ngày"  />
              <span className="cd-colon" aria-hidden="true">:</span>
              <CountItem value={padTwo(time.hours)}   label="Giờ"   />
              <span className="cd-colon" aria-hidden="true">:</span>
              <CountItem value={padTwo(time.minutes)} label="Phút"  />
              <span className="cd-colon" aria-hidden="true">:</span>
              <CountItem value={padTwo(time.seconds)} label="Giây"  />
            </>
          ) : (
            <p className="countdown-done">Hôm nay là ngày cưới!</p>
          )}
        </div>
      </div>
    </section>
  )
}

function CountItem({ value, label }) {
  return (
    <div className="cd-item">
      <span className="cd-number">{value}</span>
      <span className="cd-label">{label}</span>
    </div>
  )
}
