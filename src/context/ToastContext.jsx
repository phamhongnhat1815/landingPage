import { createContext, useState, useCallback, useRef } from 'react'

export const ToastContext = createContext(() => {})

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ msg: '', show: false })
  const timerRef = useRef(null)

  const showToast = useCallback((msg, duration = 3500) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToast({ msg, show: true })
    timerRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }))
    }, duration)
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className={`toast-wrap ${toast.show ? 'show' : ''}`} role="alert" aria-live="polite">
        <div className="toast-inner">{toast.msg}</div>
      </div>
    </ToastContext.Provider>
  )
}
