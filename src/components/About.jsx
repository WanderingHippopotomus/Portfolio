import { useState } from 'react'
import { hackathons, interests, profile } from '../data.js'

function Portrait() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`Initials of ${profile.name}`}
        className="flex aspect-[4/5] w-full items-center justify-center rounded-3xl bg-sky font-display text-7xl font-extrabold text-ink"
      >
        KS
      </div>
    )
  }

  return (
    <img
      src={profile.photo}
      alt={`Portrait of ${profile.name}`}
      onError={() => setFailed(true)}
      className="aspect-[4/5] w-full rounded-3xl bg-sky object-cover object-top"
    />
  )
}

export default function About() {
  return (
    <section id="about" className="py-16">
      <h2 className="font-display text-4xl font-extrabold tracking-tight">About</h2>

      <div className="mt-10 grid gap-10 md:grid-cols-[260px_1fr]">
        <div className="max-w-[260px]">
          <Portrait />
        </div>

        <div className="space-y-8">
          <p className="max-w-xl text-lg leading-relaxed">
            I like problems where a model has to be useful to a real person, not just accurate on a
            test set. That means cleaning data, picking a model I can explain, and wrapping it in an
            app that works offline.
          </p>

          <div>
            <h3 className="font-display text-xl font-bold">Education</h3>
            <dl className="mt-3 space-y-4">
              <div>
                <dt className="font-medium">B.Tech in Computer Science (AI/ML)</dt>
                <dd className="text-ink/75">Jagran Lakecity University. Final year, 7th semester.</dd>
              </div>
              <div>
                <dt className="font-medium">Class 12, MP Board</dt>
                <dd className="text-ink/75">Maharishi Vidya Mandir. 65.8%, First Division, March 2023.</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold">Hackathons</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {hackathons.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold">Away from the keyboard</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {interests.map((i) => (
                <li key={i} className="rounded-full bg-butter px-4 py-1.5 text-sm font-medium">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
