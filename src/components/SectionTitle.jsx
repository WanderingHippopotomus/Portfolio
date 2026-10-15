import { useRef } from 'react'
import { useInView } from '../hooks.js'

// Section heading with a small 2x2 board square that flips into place when scrolled to.
export default function SectionTitle({ children }) {
  const ref = useRef(null)
  const seen = useInView(ref, { threshold: 0.6 })

  return (
    <h2
      ref={ref}
      className="flex items-center gap-4 font-display text-4xl font-extrabold tracking-tight"
    >
      <span
        aria-hidden="true"
        className={`grid h-9 w-9 shrink-0 grid-cols-2 overflow-hidden rounded-md transition-transform duration-700 ease-out ${
          seen ? 'rotate-0 scale-100' : '-rotate-90 scale-50'
        }`}
      >
        <i className="bg-ink" />
        <i className="bg-peri" />
        <i className="bg-peri" />
        <i className="bg-ink" />
      </span>
      {children}
    </h2>
  )
}
