import { projects } from '../data.js'

function Glyph({ kind }) {
  const common = {
    viewBox: '0 0 160 110',
    className: 'h-full w-full',
    fill: 'none',
    stroke: '#1F2347',
    strokeWidth: 4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (kind === 'drift') {
    return (
      <svg {...common}>
        <path d="M14 94 H146" />
        <path d="M14 20 V94" />
        <path d="M22 40 C44 28 56 36 74 50 S110 78 138 72" stroke="#6C7BFF" strokeWidth="6" />
        <path d="M74 50 V94" strokeDasharray="4 8" />
        <circle cx="74" cy="50" r="7" fill="#F4F5FC" />
      </svg>
    )
  }
  if (kind === 'heart') {
    return (
      <svg {...common}>
        <path d="M80 92 C30 62 30 24 56 24 C70 24 78 34 80 40 C82 34 90 24 104 24 C130 24 130 62 80 92Z" fill="#F4F5FC" />
        <path d="M56 54 H68 L74 44 L82 66 L88 54 H104" stroke="#6C7BFF" strokeWidth="5" />
      </svg>
    )
  }
  if (kind === 'shield') {
    return (
      <svg {...common}>
        <path d="M80 12 L126 28 V54 C126 78 108 94 80 102 C52 94 34 78 34 54 V28Z" fill="#F4F5FC" />
        <path d="M58 54 L74 70 L104 38" stroke="#6C7BFF" strokeWidth="7" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M16 36 H56 L64 46 H100 V90 H16Z" fill="#F4F5FC" />
      <path d="M60 24 H92 L98 32 H144 V76 H112" stroke="#6C7BFF" strokeWidth="5" />
    </svg>
  )
}

export default function Projects() {
  return (
    <section id="work" className="py-16">
      <h2 className="font-display text-4xl font-extrabold tracking-tight">Work</h2>
      <p className="mt-3 max-w-xl text-lg text-ink/80">
        Four projects, each one a working app rather than a notebook.
      </p>

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <li key={p.title}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white">
              <div className={`${p.tone} flex h-48 items-center justify-center p-8`}>
                <div className="h-full w-full max-w-[220px] transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-105">
                  <Glyph kind={p.kind} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-bold leading-tight">{p.title}</h3>
                <p className="mt-2 leading-relaxed">{p.summary}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.detail}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded-full bg-paper px-3 py-1 text-xs font-medium">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
