import { useState } from 'react'
import { certificates } from '../data.js'

function Preview({ cert }) {
  const [failed, setFailed] = useState(false)

  if (!cert.image || failed) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center bg-sky p-6 text-center font-display text-lg font-bold">
        {cert.title}
      </div>
    )
  }

  return (
    <img
      src={`/certificates/${cert.image}`}
      alt={`Certificate: ${cert.title}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-[4/3] w-full bg-sky object-cover object-top"
    />
  )
}

export default function Certificates() {
  return (
    <section id="certificates" className="py-16">
      <h2 className="font-display text-4xl font-extrabold tracking-tight">Certificates</h2>
      <p className="mt-3 max-w-xl text-lg text-ink/80">
        Courses and programs I've completed.
      </p>

      {certificates.length === 0 ? (
        <p className="mt-10 max-w-xl rounded-3xl border-2 border-dashed border-ink/25 p-8 text-ink/75">
          No certificates yet. Add one in <code className="font-medium">src/data.js</code> and it will
          appear here.
        </p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {certificates.map((c) => {
            const body = (
              <>
                <Preview cert={c} />
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold leading-tight">{c.title}</h3>
                  <p className="mt-1 text-ink/80">{c.issuer}</p>
                  {c.date && <p className="mt-1 text-sm text-ink/60">{c.date}</p>}
                </div>
              </>
            )
            const card =
              'group block h-full overflow-hidden rounded-3xl border border-ink/10 bg-white transition-shadow hover:shadow-lg'
            return (
              <li key={c.title + (c.date || '')}>
                {c.link ? (
                  <a href={c.link} target="_blank" rel="noopener noreferrer" className={card}>
                    {body}
                  </a>
                ) : (
                  <article className={card}>{body}</article>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
