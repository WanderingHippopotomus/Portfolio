import { useState } from 'react'

// A small rule-based stand-in for the real model, so visitors can poke at the idea.
const SIGNALS = [
  {
    label: 'Urgency',
    points: 20,
    test: (t) => /\b(urgent|immediately|act now|last chance|expires?|limited time|within \d+ (hours?|minutes?))\b/i.test(t),
  },
  {
    label: 'Prize or free-money bait',
    points: 25,
    test: (t) => /\b(winner|won|prize|lottery|jackpot|congratulations|free gift|reward|cashback)\b/i.test(t),
  },
  {
    label: 'Asks for codes or credentials',
    points: 25,
    test: (t) => /\b(otp|password|pin|cvv|kyc|verify your|confirm your (account|identity)|login)\b/i.test(t),
  },
  {
    label: 'Account threat',
    points: 15,
    test: (t) => /\b(suspended|blocked|locked|deactivated|unauthori[sz]ed)\b/i.test(t),
  },
  {
    label: 'Payment or gift cards',
    points: 15,
    test: (t) => /\b(gift card|bitcoin|crypto|wire transfer|processing fee)\b/i.test(t),
  },
  {
    label: 'Contains a link',
    points: 20,
    test: (t) => /(https?:\/\/|www\.|bit\.ly|tinyurl)/i.test(t),
  },
  {
    label: 'Shouting in capitals',
    points: 10,
    test: (t) => {
      const letters = t.replace(/[^a-z]/gi, '')
      return letters.length >= 10 && letters.replace(/[^A-Z]/g, '').length / letters.length > 0.5
    },
  },
  {
    label: 'Lots of exclamation marks',
    points: 10,
    test: (t) => (t.match(/!/g) || []).length >= 3,
  },
]

const SAMPLES = [
  {
    name: 'Scam sample',
    text: 'URGENT: Your bank account is suspended. Verify your KYC and share the OTP within 2 hours at http://bit.ly/secure-kyc to avoid a block!!!',
  },
  {
    name: 'Normal sample',
    text: "Hey, are we still meeting at the library at 5? I'll bring the notes from today's class.",
  },
]

function rate(score) {
  if (score < 25) return { name: 'Low risk', color: '#2FA37A' }
  if (score < 55) return { name: 'Suspicious', color: '#C98F00' }
  return { name: 'Likely a scam', color: '#D6455D' }
}

export default function ScamDemo({ id }) {
  const [text, setText] = useState('')
  const hits = text.trim() ? SIGNALS.filter((s) => s.test(text)) : []
  const score = Math.min(100, hits.reduce((n, s) => n + s.points, 0))
  const level = rate(score)

  return (
    <div id={id} className="mt-5 animate-pop rounded-2xl bg-paper p-4">
      <label htmlFor={`${id}-input`} className="text-sm font-medium">
        Paste a message
      </label>
      <textarea
        id={`${id}-input`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={400}
        rows={3}
        placeholder="Type or paste a text message here"
        className="mt-2 w-full resize-none rounded-xl border-2 border-ink/15 bg-white p-3 text-sm placeholder:text-ink/45 focus:border-peri focus:outline-none"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {SAMPLES.map((s) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setText(s.text)}
            className="rounded-full border-2 border-ink px-3 py-1 text-xs font-medium transition-colors hover:bg-mint"
          >
            {s.name}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-4">
        {text.trim() ? (
          <>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-lg font-bold" style={{ color: level.color }}>
                {level.name}
              </span>
              <span className="text-sm font-medium">{score} / 100</span>
            </div>
            <div
              role="meter"
              aria-label="Scam risk score"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={score}
              className="mt-1 h-3 overflow-hidden rounded-full bg-ink/10"
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${score}%`, backgroundColor: level.color }}
              />
            </div>
            <p className="mt-3 text-sm text-ink/75">
              {hits.length ? `Signals found: ${hits.map((h) => h.label.toLowerCase()).join(', ')}.` : 'No warning signs found.'}
            </p>
          </>
        ) : (
          <p className="text-sm text-ink/65">Your score appears here as you type.</p>
        )}
      </div>

      <p className="mt-3 text-xs text-ink/60">
        This is a simplified demo that uses keyword rules. The real project scores messages with a
        trained TF-IDF model.
      </p>
    </div>
  )
}
