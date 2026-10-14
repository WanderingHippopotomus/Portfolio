import { useEffect, useState } from 'react'
import { nav, profile } from '../data.js'

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const update = () => {
      // At the very bottom of the page, the last section is always the active one.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) {
        setActive(ids[ids.length - 1])
        return
      }
      // Otherwise, the active section is the last one whose top has passed 35% of the screen.
      const line = window.innerHeight * 0.35
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids])

  return active
}

export default function Sidebar() {
  const active = useActiveSection(nav.map((n) => n.id))
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop: fixed side rail */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col justify-between border-r border-ink/10 bg-paper px-8 py-10 lg:flex">
        <div>
          <a href="#top" className="block font-display text-2xl font-extrabold leading-tight">
            {profile.firstName}
            <br />
            Shrivastava
          </a>
          <p className="mt-2 text-sm text-ink/70">{profile.role}</p>

          <nav aria-label="Sections" className="mt-12">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`block rounded-lg px-3 py-2 text-lg font-medium transition-colors ${
                      active === item.id ? 'bg-ink text-paper' : 'hover:bg-sky'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <ul className="space-y-2 text-sm">
          <li>
            <a className="underline decoration-peri decoration-2 underline-offset-4" href={profile.github}>
              GitHub
            </a>
          </li>
          <li>
            <a className="underline decoration-peri decoration-2 underline-offset-4" href={profile.linkedin}>
              LinkedIn
            </a>
          </li>
          <li>
            <a className="underline decoration-peri decoration-2 underline-offset-4" href={`mailto:${profile.email}`}>
              Email
            </a>
          </li>
        </ul>
      </aside>

      {/* Mobile: top bar */}
      <header className="fixed inset-x-0 top-0 z-30 border-b border-ink/10 bg-paper/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between px-5 py-3">
          <a href="#top" className="font-display text-lg font-extrabold">
            {profile.name}
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-paper"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Sections" className="border-t border-ink/10 px-5 pb-4">
            <ul>
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-lg font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  )
}
