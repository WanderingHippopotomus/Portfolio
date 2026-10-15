import { useEffect, useRef, useState } from 'react'
import { profile } from '../data.js'
import SectionTitle from './SectionTitle.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const steps = [
  { key: 'name', placeholder: 'Your name', type: 'text' },
  { key: 'email', placeholder: 'you@example.com', type: 'email' },
  { key: 'message', placeholder: 'Type your message', type: 'text' },
]

const greeting = { from: 'bot', text: `Hi, I'm ${profile.firstName}. What's your name?` }

function Typing() {
  return (
    <div
      role="status"
      aria-label="Kushagra is typing"
      className="flex w-16 items-center justify-center gap-1.5 self-start rounded-2xl rounded-bl-md bg-sky px-4 py-3.5"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 animate-dot rounded-full bg-ink"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </div>
  )
}

export default function Contact() {
  const [messages, setMessages] = useState([greeting])
  const [step, setStep] = useState(0)
  const [value, setValue] = useState('')
  const [answers, setAnswers] = useState({})
  const [error, setError] = useState('')
  const [typing, setTyping] = useState(false)
  const listRef = useRef(null)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  const done = step >= steps.length

  const mailto = () => {
    const subject = encodeURIComponent(`Hello from ${answers.name}`)
    const body = encodeURIComponent(`${answers.message}\n\n${answers.name}\n${answers.email}`)
    return `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const submit = (e) => {
    e.preventDefault()
    const text = value.trim()
    if (!text || typing) return
    const current = steps[step]

    if (current.key === 'email' && !EMAIL_RE.test(text)) {
      setError('That email address looks incomplete. Try name@example.com.')
      return
    }
    setError('')

    setAnswers((a) => ({ ...a, [current.key]: text }))
    setValue('')

    const replies = {
      name: `Nice to meet you, ${text}. What's your email so I can reply?`,
      email: 'Thanks. What would you like to say?',
      message: 'Got it. Tap the button below and your email app will open with this message ready to send.',
    }

    setMessages((m) => [...m, { from: 'me', text }])
    setTyping(true)
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: replies[current.key] }])
      setTyping(false)
      setStep((s) => s + 1)
    }, 800)
  }

  const restart = () => {
    clearTimeout(timer.current)
    setMessages([greeting])
    setStep(0)
    setAnswers({})
    setValue('')
    setError('')
    setTyping(false)
  }

  return (
    <section id="contact" className="py-16 pb-28">
      <SectionTitle>Contact</SectionTitle>
      <p className="mt-3 max-w-xl text-lg text-ink/80">
        Hiring, collaborating or up for a game of chess? Start the conversation here, or write
        straight to{' '}
        <a
          className="font-medium underline decoration-peri decoration-2 underline-offset-4"
          href={`mailto:${profile.email}`}
        >
          {profile.email}
        </a>
        .
      </p>

      <div className="mt-8 max-w-xl overflow-hidden rounded-3xl border border-ink/10 bg-white">
        <div
          ref={listRef}
          role="log"
          aria-live="polite"
          aria-label="Conversation"
          className="flex h-80 flex-col gap-3 overflow-y-auto p-5"
        >
          {messages.map((m, i) => (
            <p
              key={i}
              className={`max-w-[85%] animate-pop rounded-2xl px-4 py-2.5 leading-snug ${
                m.from === 'bot'
                  ? 'origin-bottom-left self-start rounded-bl-md bg-sky'
                  : 'origin-bottom-right self-end rounded-br-md bg-ink text-paper'
              }`}
            >
              {m.text}
            </p>
          ))}
          {typing && <Typing />}
        </div>

        <div className="border-t border-ink/10 p-4">
          {done ? (
            <div className="flex flex-wrap gap-3">
              <a
                href={mailto()}
                className="rounded-full bg-peri px-6 py-3 font-medium text-white transition-colors hover:bg-ink"
              >
                Open email to send
              </a>
              <button
                type="button"
                onClick={restart}
                className="rounded-full border-2 border-ink px-6 py-3 font-medium transition-colors hover:bg-mint"
              >
                Start over
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex gap-3">
              <label htmlFor="chat-input" className="sr-only">
                {steps[step].placeholder}
              </label>
              <input
                id="chat-input"
                type={steps[step].type}
                value={value}
                disabled={typing}
                onChange={(e) => setValue(e.target.value)}
                placeholder={steps[step].placeholder}
                autoComplete={steps[step].key === 'email' ? 'email' : steps[step].key === 'name' ? 'name' : 'off'}
                className="min-w-0 flex-1 rounded-full border-2 border-ink/20 bg-paper px-5 py-3 placeholder:text-ink/45 focus:border-peri focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={typing}
                className="rounded-full bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-peri disabled:opacity-60"
              >
                Send
              </button>
            </form>
          )}
          {error && (
            <p role="alert" className="mt-2 text-sm font-medium text-[#B3261E]">
              {error}
            </p>
          )}
        </div>
      </div>

      <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
        <li>
          <a
            className="font-medium underline decoration-peri decoration-2 underline-offset-4"
            href={profile.github}
          >
            GitHub: {profile.githubHandle}
          </a>
        </li>
        <li>
          <a
            className="font-medium underline decoration-peri decoration-2 underline-offset-4"
            href={profile.linkedin}
          >
            LinkedIn: {profile.linkedinHandle}
          </a>
        </li>
      </ul>
    </section>
  )
}
