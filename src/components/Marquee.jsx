import { skills } from '../data.js'

const all = skills.flatMap((s) => s.items)
const tones = ['bg-sky', 'bg-blush', 'bg-mint', 'bg-butter']

function Row({ hidden }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-4 pr-4">
      {all.map((s, i) => (
        <li
          key={s}
          className={`${tones[i % tones.length]} whitespace-nowrap rounded-full px-5 py-2 font-display text-lg font-bold text-ink`}
        >
          {s}
        </li>
      ))}
    </ul>
  )
}

// A tilted ticker of everything I work with. Hover to pause it.
export default function Marquee() {
  return (
    <div className="-mx-5 overflow-hidden py-8 sm:-mx-10 lg:-mx-16">
      <div className="-rotate-1 bg-ink py-4">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          <Row />
          <Row hidden />
        </div>
      </div>
    </div>
  )
}
