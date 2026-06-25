import { useState } from 'react'
import { Gift as GiftIcon, X, Copy, Check, Heart } from 'lucide-react'
import useReveal from '../hooks/useReveal'
import { useToast } from '../hooks/useToast'

export default function Gift() {
  const headerRef = useReveal()
  const btnRef = useReveal(0.15)
  const showToast = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [copiedGroom, setCopiedGroom] = useState(false)
  const [copiedBride, setCopiedBride] = useState(false)

  const accounts = {
    groom: {
      bank: 'Ngân hàng Techcombank',
      number: '1903 5462 8990 12',
      holder: 'NGUYỄN VĂN HÙNG',
      label: 'Chú rể Văn Hùng',
    },
    bride: {
      bank: 'Ngân hàng Vietcombank',
      number: '1012 3456 78',
      holder: 'LÊ MỸ LINH',
      label: 'Cô dâu Mỹ Linh',
    },
  }

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text.replace(/\s+/g, ''))
      .then(() => {
        showToast('Đã sao chép số tài khoản!')
        if (type === 'groom') {
          setCopiedGroom(true)
          setTimeout(() => setCopiedGroom(false), 2000)
        } else {
          setCopiedBride(true)
          setTimeout(() => setCopiedBride(false), 2000)
        }
      })
      .catch(() => {
        showToast('Không thể sao chép.')
      })
  }

  return (
    <section id="gift" className="gift-section" aria-label="Thông tin mừng cưới">
      <div className="container">
        <div ref={headerRef} className="gift-header reveal">
          <p className="section-label">Hộp mừng cưới</p>
          <h2 className="section-title">Thông Tin Mừng Cưới</h2>
          <div className="divider">
            <span className="divider-dot" aria-hidden="true" />
          </div>
          <p className="gift-intro">
            Sự hiện diện của quý vị là món quà lớn nhất dành cho chúng tôi. 
            Tuy nhiên, nếu quý vị muốn gửi một chút quà mừng, xin vui lòng xem thông tin bên dưới.
          </p>
        </div>

        <div ref={btnRef} className="gift-action-wrap reveal">
          <button onClick={() => setIsOpen(true)} className="btn btn-gold btn-gift-trigger">
            <GiftIcon size={18} />
            Mừng Cưới Đến Cô Dâu &amp; Chú Rể
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="gift-modal-overlay" onClick={() => setIsOpen(false)} role="dialog" aria-modal="true">
          <div className="gift-modal" onClick={(e) => e.stopPropagation()}>
            <button className="gift-modal-close" onClick={() => setIsOpen(false)} aria-label="Đóng modal">
              <X size={20} />
            </button>

            <div className="gift-modal-header">
              <div className="gift-modal-icon-wrap">
                <GiftIcon size={32} className="text-gold" />
              </div>
              <h3 className="gift-modal-title">Quà Mừng Cưới</h3>
              <p className="gift-modal-subtitle">Gửi lời chúc phúc và quà mừng đến cặp đôi</p>
            </div>

            <div className="gift-modal-grid">
              {/* Groom's Account */}
              <div className="gift-card-account">
                <p className="gift-card-badge groom">Mừng Chú Rể</p>
                <div className="gift-card-body">
                  <p className="gift-bank-name">{accounts.groom.bank}</p>
                  <div className="gift-number-wrap">
                    <span className="gift-number">{accounts.groom.number}</span>
                    <button 
                      className="btn-copy-account" 
                      onClick={() => copyToClipboard(accounts.groom.number, 'groom')}
                      title="Sao chép số tài khoản"
                    >
                      {copiedGroom ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <p className="gift-holder-label">Chủ tài khoản:</p>
                  <p className="gift-holder-name">{accounts.groom.holder}</p>
                </div>
              </div>

              {/* Bride's Account */}
              <div className="gift-card-account">
                <p className="gift-card-badge bride">Mừng Cô Dâu</p>
                <div className="gift-card-body">
                  <p className="gift-bank-name">{accounts.bride.bank}</p>
                  <div className="gift-number-wrap">
                    <span className="gift-number">{accounts.bride.number}</span>
                    <button 
                      className="btn-copy-account" 
                      onClick={() => copyToClipboard(accounts.bride.number, 'bride')}
                      title="Sao chép số tài khoản"
                    >
                      {copiedBride ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <p className="gift-holder-label">Chủ tài khoản:</p>
                  <p className="gift-holder-name">{accounts.bride.holder}</p>
                </div>
              </div>
            </div>

            <div className="gift-modal-footer">
              <Heart size={20} className="text-heart" fill="var(--wine)" />
              <p className="gift-thanks">
                Cảm ơn sự yêu thương và chúc phúc từ tận đáy lòng của Quý khách dành cho tổ ấm mới của chúng tôi!
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
