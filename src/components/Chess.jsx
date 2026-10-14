import { chessResults, otherChess } from '../data.js'

export default function Chess() {
  return (
    <section id="chess" className="py-16">
      <h2 className="font-display text-4xl font-extrabold tracking-tight">Chess</h2>
      <p className="mt-3 max-w-xl text-lg text-ink/80">
        International and national-level player. Chess is where I learned to plan ahead and stay
        calm when the position gets messy.
      </p>

      <ol className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
        {chessResults.map((r) => (
          <li key={r.event} className="flex items-center gap-5 py-5 sm:gap-8">
            <span className="w-24 shrink-0 font-display text-5xl font-extrabold text-peri sm:w-32 sm:text-6xl">
              {r.place}
            </span>
            <div>
              <p className="text-lg font-medium leading-snug">{r.event}</p>
              <p className="text-sm text-ink/65">{r.note}</p>
            </div>
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
