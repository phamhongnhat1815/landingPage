import { useState } from 'react'
import { Gift as GiftIcon, X, Copy, Check, Heart } from 'lucide-react'
import useReveal from '../hooks/useReveal'
import { useToast } from '../hooks/useToast'

export default function Gift() {
  const headerRef = useReveal()
  const btnRef    = useReveal(0.15)
  const showToast = useToast()
  const [isOpen,       setIsOpen]       = useState(false)
  const [activeTab,    setActiveTab]    = useState('groom') // 'groom' | 'bride'
  const [copiedGroom,  setCopiedGroom]  = useState(false)
  const [copiedBride,  setCopiedBride]  = useState(false)
  const [animating,    setAnimating]    = useState(false)

  const accounts = {
    groom: {
      bank:   'Ngân hàng Agribank',
      number: '3590218002471',
      holder: 'NGUYỄN VĂN QUANG',
    },
    bride: {
      bank:   'Ngân hàng Vietinbank',
      number: '102887519524',
      holder: 'NGUYỄN THỊ LINH',
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
      .catch(() => showToast('Không thể sao chép.'))
  }

  const switchTab = (tab) => {
    if (tab === activeTab || animating) return
    setAnimating(true)
    setTimeout(() => {
      setActiveTab(tab)
      setAnimating(false)
    }, 220)
  }

  const current = accounts[activeTab]
  const isCopied = activeTab === 'groom' ? copiedGroom : copiedBride
  const copyType = activeTab

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
            <GiftIcon size={17} />
            Mừng Cưới Đến Cô Dâu &amp; Chú Rể
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="gift-modal-overlay"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Thông tin mừng cưới"
        >
          <div className="gift-modal gift-modal--tabbed" onClick={e => e.stopPropagation()}>
            <button
              className="gift-modal-close"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng"
            >
              <X size={18} />
            </button>

            {/* Tab switcher */}
            <div className="gift-tab-switcher" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'groom'}
                className={`gift-tab-btn${activeTab === 'groom' ? ' active' : ''}`}
                onClick={() => switchTab('groom')}
                id="tab-groom"
              >
                <span className="gift-tab-icon">♙</span>
                Mừng Chú Rể
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'bride'}
                className={`gift-tab-btn${activeTab === 'bride' ? ' active bride' : ''}`}
                onClick={() => switchTab('bride')}
                id="tab-bride"
              >
                <span className="gift-tab-icon">♕</span>
                Mừng Cô Dâu
              </button>
              {/* Sliding indicator */}
              <span
                className={`gift-tab-indicator${activeTab === 'bride' ? ' right' : ''}`}
                aria-hidden="true"
              />
            </div>

            {/* Card content */}
            <div
              className={`gift-modal-card-wrap${animating ? ' gift-tab-exit' : ' gift-tab-enter'}`}
              aria-labelledby={activeTab === 'groom' ? 'tab-groom' : 'tab-bride'}
            >
              <div className={`gift-card-single${activeTab === 'bride' ? ' bride' : ''}`}>
                {/* Badge */}
                <div className={`gift-single-badge${activeTab === 'bride' ? ' bride' : ''}`}>
                  {activeTab === 'groom' ? 'Mừng Chú Rể' : 'Mừng Cô Dâu'}
                </div>

                <div className="gift-card-body-single">
                  <p className="gift-bank-name">{current.bank}</p>

                  <div className="gift-number-wrap">
                    <span className="gift-number">{current.number}</span>
                    <button
                      className="btn-copy-account"
                      onClick={() => copyToClipboard(current.number, copyType)}
                      title="Sao chép số tài khoản"
                      aria-label={`Sao chép số tài khoản ${activeTab === 'groom' ? 'chú rể' : 'cô dâu'}`}
                    >
                      {isCopied
                        ? <Check size={15} className="text-success" />
                        : <Copy size={15} />}
                    </button>
                  </div>

                  <p className="gift-holder-label">Chủ tài khoản:</p>
                  <p className="gift-holder-name">{current.holder}</p>
                </div>
              </div>
            </div>

            <div className="gift-modal-footer">
              <Heart size={18} className="text-heart" fill="currentColor" />
              <p className="gift-thanks">
                Cảm ơn sự yêu thương và chúc phúc từ tận đáy lòng của Quý khách
                dành cho tổ ấm mới của chúng tôi!
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
