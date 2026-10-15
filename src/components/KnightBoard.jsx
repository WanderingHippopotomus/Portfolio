import { useCallback, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks.js'

const FILES = 'abcdefgh'
const JUMPS = [
  [1, 2], [2, 1], [2, -1], [1, -2],
  [-1, -2], [-2, -1], [-2, 1], [-1, 2],
]
const inside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8
const label = ([r, c]) => `${FILES[c]}${8 - r}`
const key = (r, c) => r * 8 + c
const STEP_MS = 420

// Breadth-first search: the first time we reach a square is the shortest route to it.
function shortestPath(from, to) {
  const prev = new Map([[key(...from), null]])
  const queue = [from]
  while (queue.length) {
    const [r, c] = queue.shift()
    if (r === to[0] && c === to[1]) break
    for (const [dr, dc] of JUMPS) {
      const nr = r + dr
      const nc = c + dc
      if (!inside(nr, nc) || prev.has(key(nr, nc))) continue
      prev.set(key(nr, nc), [r, c])
      queue.push([nr, nc])
    }
  }
  const path = []
  let cur = to
  while (cur) {
    path.unshift(cur)
    cur = prev.get(key(...cur))
  }
  return path
}

const plural = (n) => `${n} ${n === 1 ? 'move' : 'moves'}`

export default function KnightBoard() {
  const reduced = usePrefersReducedMotion()
  const [pos, setPos] = useState([7, 1])
  const [trail, setTrail] = useState([[7, 1]])
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState('The knight starts on b1.')
  const [interacted, setInteracted] = useState(false)
  const posRef = useRef(pos)
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => clearTimers, [])

  const go = useCallback(
    (target) => {
      clearTimers()
      const path = shortestPath(posRef.current, target)
      if (path.length === 1) {
        setStatus(`The knight is already on ${label(target)}.`)
        return
      }
      const moves = path.length - 1
      setTrail([path[0]])
      setStatus(`Heading to ${label(target)}: ${plural(moves)}.`)
      path.slice(1).forEach((sq, i) => {
        const t = setTimeout(
          () => {
            posRef.current = sq
            setPos(sq)
            setTrail((tr) => [...tr, sq])
            setStep((s) => s + 1)
            if (i === moves - 1) setStatus(`Reached ${label(target)} in ${plural(moves)}.`)
          },
          reduced ? 0 : (i + 1) * STEP_MS,
        )
        timers.current.push(t)
      })
    },
    [reduced],
  )

  const randomSquare = useCallback(() => {
    let sq
    do {
      sq = [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)]
    } while (sq[0] === posRef.current[0] && sq[1] === posRef.current[1])
    go(sq)
  }, [go])

  // Until the visitor clicks, the knight wanders on its own so the board looks alive.
  useEffect(() => {
    if (reduced || interacted) return
    const first = setTimeout(randomSquare, 1800)
    const id = setInterval(randomSquare, 4600)
    return () => {
      clearTimeout(first)
      clearInterval(id)
    }
  }, [reduced, interacted, randomSquare])

  const onSquare = (sq) => {
    setInteracted(true)
    go(sq)
  }

  const legal = JUMPS.map(([dr, dc]) => [pos[0] + dr, pos[1] + dc]).filter(([r, c]) => inside(r, c))
  const legalKeys = new Set(legal.map(([r, c]) => key(r, c)))
  const trailOrder = new Map(trail.map(([r, c], i) => [key(r, c), i]))

  return (
    <div className="w-full">
      <div
        role="group"
        aria-label="Chessboard with a knight"
        className="relative mx-auto aspect-square w-full max-w-[480px] overflow-hidden rounded-3xl border-[3px] border-ink bg-paper shadow-[8px_8px_0_0_#1F2347]"
        style={{ containerType: 'inline-size' }}
      >
        <div className="grid h-full w-full grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }, (_, i) => {
            const r = Math.floor(i / 8)
            const c = i % 8
            const dark = (r + c) % 2 === 1
            const order = trailOrder.get(i)
            return (
              <button
                key={i}
                type="button"
                tabIndex={-1}
                onClick={() => onSquare([r, c])}
                aria-label={`Send the knight to ${label([r, c])}`}
                className={`relative transition-colors hover:bg-butter ${dark ? 'bg-[#B8C1FF]' : 'bg-paper'}`}
              >
                {order !== undefined && (
                  <span className="absolute inset-[10%] rounded-lg bg-mint" aria-hidden="true" />
                )}
                {legalKeys.has(i) && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/40"
                  />
                )}
                {order !== undefined && order > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute right-[10%] top-[6%] text-[min(2.6cqw,12px)] font-bold"
                  >
                    {order}
                  </span>
                )}
                {c === 0 && (
                  <span aria-hidden="true" className="absolute left-[6%] top-[4%] text-[min(2.4cqw,11px)] font-bold text-ink/60">
                    {8 - r}
                  </span>
                )}
                {r === 7 && (
                  <span aria-hidden="true" className="absolute bottom-[4%] right-[8%] text-[min(2.4cqw,11px)] font-bold text-ink/60">
                    {FILES[c]}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* The knight sits on top and slides between squares. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-[12.5%] w-[12.5%]"
          style={{
            left: `${pos[1] * 12.5}%`,
            top: `${pos[0] * 12.5}%`,
            transition: reduced ? 'none' : `left ${STEP_MS - 40}ms ease-in-out, top ${STEP_MS - 40}ms ease-in-out`,
          }}
        >
          <span
            key={step}
            className={`flex h-full w-full items-center justify-center text-ink drop-shadow-[0_3px_0_rgba(108,123,255,0.55)] ${
              step > 0 ? 'animate-hop' : ''
            }`}
            style={{ fontSize: '10.5cqw', lineHeight: 1, fontFamily: '"Noto Sans Symbols 2","DejaVu Sans","Segoe UI Symbol",serif' }}
          >
            {'♞︎'}
          </span>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-[480px]">
        <p className="font-medium">Click any square. The knight finds the shortest route there.</p>
        <p aria-live={interacted ? 'polite' : 'off'} className="mt-1 min-h-[1.5rem] text-sm text-ink/70">
          {status}
        </p>
        <button
          type="button"
          onClick={() => {
            setInteracted(true)
            randomSquare()
          }}
          className="mt-3 rounded-full border-2 border-ink px-5 py-2 text-sm font-medium transition-colors hover:bg-mint"
        >
          Send it somewhere random
        </button>
      </div>
    </div>
  )
}
