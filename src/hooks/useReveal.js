import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to the returned ref.
 * Once the element enters the viewport it gets class "visible".
 *
 * @param {number} delay   - CSS transition-delay in seconds
 * @param {string} dir     - '' | 'left' | 'right'  (selects the reveal-* class)
 */
export default function useReveal(delay = 0, dir = '') {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (delay) el.style.transitionDelay = `${delay}s`

    const cls = dir === 'left'
      ? 'reveal-left'
      : dir === 'right'
        ? 'reveal-right'
        : 'reveal'

    el.classList.add(cls)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, dir])

  return ref
}
