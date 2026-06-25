import useReveal from '../hooks/useReveal'
import Divider from './Divider'

export default function Invitation() {
  const ref1 = useReveal()
  const ref2 = useReveal(0.2)

  return (
    <section id="invitation" className="invitation" aria-label="Lời mời">
      <div className="invitation-inner">
        <div ref={ref1} className="reveal">
          <p className="section-label">Thiệp mời</p>
          <h2 className="section-title">Trân Trọng Kính Mời</h2>
          <Divider />
          <p className="invitation-quote">
            Với niềm hân hoan và biết ơn sâu sắc, chúng tôi trân trọng kính mời bạn
            đến chứng kiến và chúc phúc cho lễ thành hôn của chúng tôi —
            một trong những ngày thiêng liêng nhất trong cuộc đời.
          </p>
        </div>

        <div ref={ref2} className="reveal">
          <div className="invite-cards">
            <div className="invite-card-item">
              <p className="invite-card-label">Thứ Hai</p>
              <p className="invite-card-value">24</p>
              <p className="invite-card-label" style={{ marginTop: '0.3rem' }}>Tháng 07</p>
            </div>
            <div className="invite-card-item">
              <p className="invite-card-label">Năm</p>
              <p className="invite-card-value">2026</p>
            </div>
            <div className="invite-card-item">
              <p className="invite-card-label">Lễ thành hôn</p>
              <p className="invite-card-value">10:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

