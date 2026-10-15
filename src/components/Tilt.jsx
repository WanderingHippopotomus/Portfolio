import { useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks.js'

// Tilts its child toward the mouse. Does nothing on touch screens or with reduced motion.
export default function Tilt({ children, className = '', max = 6 }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  const onMove = (e) => {
    if (reduced || e.pointerType === 'touch' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  )
}
