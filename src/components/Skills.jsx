import { skills } from '../data.js'

const tones = ['bg-sky', 'bg-blush', 'bg-mint']

export default function Skills() {
  return (
    <section id="skills" className="py-16">
      <h2 className="font-display text-4xl font-extrabold tracking-tight">Skills</h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {skills.map((s, i) => (
          <div key={s.group} className={`${tones[i % tones.length]} rounded-3xl p-6`}>
            <h3 className="font-display text-xl font-bold">{s.group}</h3>
            <ul className="mt-4 space-y-1.5">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
