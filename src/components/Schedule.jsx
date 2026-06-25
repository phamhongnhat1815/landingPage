import { Sparkles, GlassWater, Heart } from 'lucide-react'
import useReveal from '../hooks/useReveal'

const EVENTS = [
  { time: '22/7', icon: Sparkles, name: 'Lễ Nạp Tài',    note: 'Nghi thức ăn hỏi, trao lễ vật và nhận lễ vật, đánh dấu lễ cưới chính thức diễn ra.' },
  { time: '23/7', icon: GlassWater, name: 'Tiệc Cưới',       note: 'Khai tiệc mừng hạnh phúc cùng gia đình và bạn bè với những món ăn đặc sắc.' },
  { time: '24/7', icon: Heart, name: 'Lễ Thành Hôn',      note: 'Nghi thức trao nhẫn và lời thề ước tại sảnh chính.' },
]

export default function Schedule() {
  const textRef = useReveal()
  const imgRef  = useReveal(0.2, 'right')

  return (
    <section id="schedule" className="schedule" aria-label="Lịch trình lễ cưới">
      <div className="container">
        <div className="schedule-grid">
          {/* Left: text + timeline */}
          <div>
            <div ref={textRef} className="reveal schedule-text-header">
              <p className="section-label">Chương trình</p>
              <h2 className="section-title">Lịch Trình Lễ Cưới</h2>
              <div className="divider" style={{ justifyContent: 'flex-start', marginLeft: 0 }}>
                <span className="divider-dot" aria-hidden="true" />
                <div style={{ flex: 1, maxWidth: 72, height: 1, background: 'linear-gradient(to right, var(--gold), transparent)' }} />
              </div>
            </div>

            <div className="schedule-list">
              {EVENTS.map((ev, i) => (
                <ScheduleItem key={ev.name} ev={ev} delay={i * 0.12} />
              ))}
            </div>
          </div>

          {/* Right: photo */}
          <div className="schedule-img-wrap reveal-right" ref={imgRef}>
            <img
              src="https://lh3.googleusercontent.com/aida/AP1WRLu9sGad53TRQkBW_oqPVJj5OF1tUvSwjlBA_046hqg3iaBPtadAmVfLCKmocr8FoOCO2JT9K0D2Qi1SkmKhLESxFJCPMUQhADtHgHj_EJPS2Ps59Kz7HGBZ9_Yu0RSlzMEn3dUwqbNfMAsq7IHaCqptw9Bve8w5AxocAm2yGn47trpWakxGk8pmolxDAxAiKMNBFWzn7psgQkFrLSmDVVfA-eMhGxhQ46OG0kuvepE0_1Y1aA8UEVJOzH8V"
              alt="Cô dâu và chú rể"
              loading="lazy"
            />
            <div className="schedule-badge">
              <p className="schedule-badge-day">24</p>
              <p className="schedule-badge-month">Tháng 07 · 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScheduleItem({ ev, delay }) {
  const ref = useReveal(delay)
  const Icon = ev.icon
  return (
    <div ref={ref} className="schedule-item reveal">
      <span className="schedule-time">{ev.time}</span>
      <div className="schedule-dot">
        <Icon size={16} className="text-white" />
      </div>
      <div>
        <p className="schedule-name">{ev.name}</p>
        <p className="schedule-note">{ev.note}</p>
      </div>
    </div>
  )
}
