import { profile } from '../data.js'

export default function Hero() {
  return (
    <section id="top" className="pb-20 pt-10 lg:pt-16">
      <h1 className="max-w-3xl animate-rise font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
        I build machine learning tools people can use.
      </h1>

      {/* The one memorable element: a chessboard strip that runs off the edge. */}
      <div
        aria-hidden="true"
        className="board-strip mt-10 h-24 w-full animate-rise rounded-2xl opacity-90 [animation-delay:150ms]"
        style={{ backgroundPosition: '0 0' }}
      />

      <div className="mt-10 grid gap-8 md:grid-cols-[1.3fr_1fr]">
        <p className="max-w-xl text-lg leading-relaxed text-ink/85">
          I'm {profile.firstName}, a Computer Science Engineering student specializing in AI & ML, focused on building intelligent systems through machine learning, predictive modeling, and data-driven solutions. As a national and international-level chess player, I bring strong analytical and strategic problem-solving skills.
        </p>
        <div className="flex flex-wrap items-start gap-3 md:justify-end">
          <a
            href="#work"
            className="rounded-full bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-peri"
          >
            See my projects
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-ink px-6 py-3 font-medium transition-colors hover:bg-mint"
          >
            Say hello
          </a>
        </div>
      </div>
    </section>
  )
}
