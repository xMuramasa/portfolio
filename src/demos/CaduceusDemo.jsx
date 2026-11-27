import { useEffect, useState } from 'react'

const STAGES = ['ready', 'dispatch', 'run', 'review', 'merge', 'done']

// One task through Caduceus, simplified: [stage, kind, text].
const SCRIPT = [
  ['ready', 'cmd', 'caduceus dispatch check app#42'],
  ['ready', 'ok', 'open · blockers closed · not running · settings · budget · slot 1/2 · no file overlap'],
  ['dispatch', 'cmd', 'caduceus dispatch start app#42'],
  ['dispatch', 'out', 'worktree  feat/42-tag-search'],
  ['dispatch', 'out', 'run       claude -p in a systemd user service, allow/deny lists from .caduceus/project.toml'],
  ['run', 'cmd', 'caduceus run status app#42'],
  ['run', 'out', 'running · stream-json transcript · no commits, pushes or credentials'],
  ['run', 'ok', 'finished · gates: test ✓ build ✓ lint ✓ format ✓'],
  ['review', 'cmd', 'caduceus pr open app#42'],
  ['review', 'out', 'PR #43  feat(search): tag search (#42) → develop'],
  ['review', 'ok', 'review · approved'],
  ['merge', 'cmd', 'caduceus pr merge app#43'],
  ['merge', 'ok', 'rebased on develop · gates pass again · merged in queue order'],
  ['done', 'ok', 'issue #42 closed · board: Done'],
]

const MSG = {
  en: { replay: 'Replay', label: 'Caduceus pipeline' },
  es: { replay: 'Repetir', label: 'Pipeline de Caduceus' },
}

const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function CaduceusDemo({ lang }) {
  const [shown, setShown] = useState(() => (reduced() ? SCRIPT.length : 0))
  const [round, setRound] = useState(0)

  useEffect(() => {
    if (shown >= SCRIPT.length) return
    const delay = SCRIPT[shown][1] === 'cmd' ? 900 : 450
    const id = setTimeout(() => setShown((n) => n + 1), delay)
    return () => clearTimeout(id)
  }, [shown, round])

  const stage = shown ? STAGES.indexOf(SCRIPT[shown - 1][0]) : -1
  const finished = shown >= SCRIPT.length

  return (
    <div className="demo cad-demo" aria-label={MSG[lang].label}>
      <ol className="cad-stages">
        {STAGES.map((s, i) => (
          <li key={s} className={i < stage || (finished && i === stage) ? 'past' : i === stage ? 'now' : ''}>{s}</li>
        ))}
      </ol>
      <pre className="cad-term" aria-live="polite">
        {SCRIPT.slice(0, shown).map(([, kind, text], i) => (
          <div key={i} className={`cad-line ${kind}`}>
            {kind === 'cmd' ? '$ ' : kind === 'ok' ? '✓ ' : '  '}
            {text}
          </div>
        ))}
        {!finished && <span className="cad-cursor">▌</span>}
      </pre>
      <button
        className="btn cad-replay"
        disabled={!finished}
        onClick={() => {
          setShown(0)
          setRound((r) => r + 1)
        }}
      >
        ↻ {MSG[lang].replay}
      </button>
    </div>
  )
}
