import { useEffect, useRef, useState } from 'react'
import { chessResults, otherChess } from '../data.js'
import { useInView, usePrefersReducedMotion } from '../hooks.js'
import SectionTitle from './SectionTitle.jsx'

function ordinal(n) {
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`
  return `${n}${{ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th'}`
}

// Counts up to the final placement when the row scrolls into view.
function Place({ value }) {
  const ref = useRef(null)
  const seen = useInView(ref, { threshold: 0.6 })
  const reduced = usePrefersReducedMotion()
  const target = parseInt(value, 10)
  const [shown, setShown] = useState(reduced ? target : 1)

  useEffect(() => {
    if (!seen) return
    if (reduced) {
      setShown(target)
      return
    }
    const start = performance.now()
    const duration = 700 + target * 30
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setShown(Math.max(1, Math.round(target * (1 - Math.pow(1 - p, 3)))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, target, reduced])

  return (
    <span
      ref={ref}
      aria-label={value}
      className="w-28 shrink-0 font-display text-5xl font-extrabold tabular-nums text-peri sm:w-36 sm:text-6xl"
    >
      <span aria-hidden="true">{ordinal(shown)}</span>
    </span>
  )
}

export default function Chess() {
  return (
    <section id="chess" className="py-16">
      <SectionTitle>Chess</SectionTitle>
      <p className="mt-3 max-w-xl text-lg text-ink/80">
        International and national-level player. Chess is where I learned to plan ahead and stay
        calm when the position gets messy.
      </p>

      <ol className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
        {chessResults.map((r) => (
          <li
            key={r.event}
            className="group flex items-center gap-4 px-2 py-5 transition-colors hover:bg-mint/60 sm:gap-6 sm:px-4"
          >
            <Place value={r.place} />
            <div>
              <p className="text-lg font-medium leading-snug">{r.event}</p>
              <p className="text-sm text-ink/65">{r.note}</p>
            </div>
            <span
              aria-hidden="true"
              className="ml-auto hidden -translate-x-4 text-4xl opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
              style={{ fontFamily: '"Noto Sans Symbols 2","DejaVu Sans","Segoe UI Symbol",serif' }}
            >
              {'♞︎'}
            </span>
          </li>
        ))}
      </ol>

      <ul className="mt-6 list-disc space-y-1 pl-5 text-ink/85">
        {otherChess.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>
    </section>
  )
}
