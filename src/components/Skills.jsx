import { skills } from '../data.js'
import SectionTitle from './SectionTitle.jsx'

const tones = ['bg-sky', 'bg-blush', 'bg-mint']

export default function Skills() {
  return (
    <section id="skills" className="py-16">
      <SectionTitle>Skills</SectionTitle>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {skills.map((s, i) => (
          <div key={s.group} className={`${tones[i % tones.length]} rounded-3xl p-6`}>
            <h3 className="font-display text-xl font-bold">{s.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.items.map((item) => (
                <li
                  key={item}
                  className="cursor-default rounded-full bg-white px-3 py-1.5 text-sm font-medium transition-transform duration-200 hover:-rotate-3 hover:scale-110"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
