import KnightBoard from './KnightBoard.jsx'
import { profile } from '../data.js'

const words = 'I build machine learning tools people can use.'.split(' ')

export default function Hero() {
  return (
    <section id="top" className="pb-10 pt-10 lg:pt-16">
      <div className="grid items-center gap-14 xl:grid-cols-[1fr_0.95fr]">
        <div>
          <h1 className="font-display text-5xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.14em] align-bottom">
                <span
                  className="inline-block animate-wordIn"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  {w}
                </span>
                {i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-md animate-rise text-lg leading-relaxed text-ink/85 [animation-delay:900ms]">
I'm {profile.firstName}, a Computer Science Engineering student specializing in AI & ML, focused on building intelligent systems through machine learning, predictive modeling, and data-driven solutions. As a national and international-level chess player, I bring strong analytical and strategic problem-solving skills.
          </p>

          <div className="mt-8 flex animate-rise flex-wrap gap-3 [animation-delay:1050ms]">
            <a
              href="#work"
              className="rounded-full bg-ink px-6 py-3 font-medium text-paper transition-transform hover:-translate-y-0.5 hover:bg-peri"
            >
              See my projects
            </a>
            <a
              href="#contact"
              className="rounded-full border-2 border-ink px-6 py-3 font-medium transition-transform hover:-translate-y-0.5 hover:bg-mint"
            >
              Say hello
            </a>
          </div>
        </div>

        <div className="animate-rise [animation-delay:400ms]">
          <KnightBoard />
        </div>
      </div>
    </section>
  )
}
