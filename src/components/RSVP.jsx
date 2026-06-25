import { useState } from 'react'
import { PartyPopper, Send, Loader2 } from 'lucide-react'
import useReveal from '../hooks/useReveal'
import { useToast } from '../hooks/useToast'

export default function RSVP() {
  const headerRef = useReveal()
  const formRef   = useReveal(0.2)
  const showToast = useToast()

  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', attend: '', guests: '0', message: '',
  })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.attend) {
      showToast('Vui lòng điền đầy đủ thông tin bắt buộc.')
      return
    }
    setLoading(true)
    // Simulate async submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      showToast('Xác nhận thành công! Hẹn gặp bạn ngày 24/07/2026!')
    }, 1200)
  }

  return (
    <section id="rsvp" className="rsvp" aria-label="xác nhận tham dự">
      <div className="rsvp-inner">
        <div ref={headerRef} className="reveal">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.45)' }}>Xác nhận tham dự</p>
          <div className="divider">
            <span className="divider-dot" aria-hidden="true" style={{ background: 'rgba(255,255,255,0.25)' }} />
          </div>
          <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontWeight: 300 }}>
            Vui lòng xác nhận sự có mặt trước ngày{' '}
            <strong style={{ color: 'var(--gold)' }}>22/07/2026</strong>
          </p>
        </div>

        {submitted ? (
          <div ref={formRef} className="rsvp-success reveal">
            <div className="rsvp-success-icon-wrap">
              <PartyPopper size={36} className="text-gold" />
            </div>
            <p className="rsvp-success-title">Cảm ơn, {form.name}!</p>
            <p className="rsvp-success-msg">
              Chúng tôi đã nhận được xác nhận và rất mong gặp bạn ngày 23/07!
            </p>
          </div>
        ) : (
          <form ref={formRef} className="rsvp-form reveal" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rsvp-name">Họ và tên *</label>
                <input
                  id="rsvp-name"
                  type="text"
                  name="name"
                  placeholder="Nguyễn Văn A"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="rsvp-phone">Số điện thoại</label>
                <input
                  id="rsvp-phone"
                  type="tel"
                  name="phone"
                  placeholder="0901 234 567"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rsvp-attend">Xác nhận tham dự *</label>
                <select
                  id="rsvp-attend"
                  name="attend"
                  value={form.attend}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Chọn...</option>
                  <option value="yes">Tôi sẽ tham dự</option>
                  <option value="maybe">Có thể tham dự</option>
                  <option value="no">Tiếc là không thể</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="rsvp-guests">Số khách đi cùng</label>
                <select
                  id="rsvp-guests"
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                >
                  <option value="0">Chỉ một mình</option>
                  <option value="1">+1 người</option>
                  <option value="2">+2 người</option>
                  <option value="3">+3 người trở lên</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="rsvp-msg">Lời chúc (không bắt buộc)</label>
              <textarea
                id="rsvp-msg"
                name="message"
                rows={3}
                placeholder="Gửi lời chúc mừng tới cô dâu và chú rể..."
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <div className="form-submit-wrap">
              <button
                type="submit"
                className="btn btn-gold"
                disabled={loading}
                style={{ minWidth: 200 }}
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Gửi Xác Nhận
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
