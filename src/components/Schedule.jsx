import { Sparkles, GlassWater, Heart } from 'lucide-react'
import useReveal from '../hooks/useReveal'

const EVENTS = [
  {
    time:  '22/7',
    icon:  Sparkles,
    name:  'Lễ Nạp Tài',
    note:  'Nghi thức ăn hỏi, trao lễ vật và nhận lễ vật diễn ra tại gia đình nhà gái vào lúc 12h30.',
  },
  {
    time:  '23/7',
    icon:  GlassWater,
    name:  'Tiệc Cưới',
    note:  'Khai tiệc mừng hạnh phúc cùng gia đình và bạn bè với những món ăn đặc sắc.',
  },
  {
    time:  '24/7',
    icon:  Heart,
    name:  'Lễ Thành Hôn',
    note:  'Diễn ra tại gia đình nhà trai vào lúc 9 giờ.',
  },
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
                <div
                  style={{
                    flex: 1,
                    maxWidth: 80,
                    height: 1,
                    background: 'linear-gradient(to right, var(--gold-pale), transparent)',
                  }}
                />
              </div>
            </div>

            <div className="schedule-list">
              {EVENTS.map((ev, i) => (
                <ScheduleItem key={ev.name} ev={ev} delay={i * 0.13} />
              ))}
            </div>
          </div>

          {/* Right: photo */}
          <div className="schedule-img-wrap reveal-right" ref={imgRef}>
            <img src="/src/assets/7.jpg" alt="Ảnh cưới" loading="lazy" />
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
  const ref  = useReveal(delay)
  const Icon = ev.icon
  return (
    <div ref={ref} className="schedule-item reveal">
      <span className="schedule-time">{ev.time}</span>
      <div className="schedule-dot">
        <Icon size={15} color="white" strokeWidth={1.5} />
      </div>
      <div>
        <p className="schedule-name">{ev.name}</p>
        <p className="schedule-note">{ev.note}</p>
      </div>
    </div>
  )
}
