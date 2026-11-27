import { useState } from 'react'
import androidList from '../assets/trismegistus/android-list.webp'
import androidRun from '../assets/trismegistus/android-run.webp'
import macChat from '../assets/trismegistus/mac-chat.webp'
import macGithub from '../assets/trismegistus/mac-github.webp'

const SHOTS = [
  { device: 'mac', src: macChat, label: { en: 'macOS · chat', es: 'macOS · chat' } },
  { device: 'mac', src: macGithub, label: { en: 'macOS · GitHub board', es: 'macOS · tablero de GitHub' } },
  { device: 'phone', src: androidList, label: { en: 'Android · today', es: 'Android · hoy' } },
  { device: 'phone', src: androidRun, label: { en: 'Android · live run', es: 'Android · ejecución en vivo' } },
]

// One relay, two native clients: flip through the real screens.
export default function TrismegistusDemo({ lang }) {
  const [i, setI] = useState(0)
  const shot = SHOTS[i]
  return (
    <div className="demo tris-demo">
      <div className={`tris-frame ${shot.device}`}>
        <img src={shot.src} alt={`Trismegistus ${shot.label[lang]}`} loading="lazy" draggable={false} />
      </div>
      <div className="vireo-tabs tris-tabs">
        {SHOTS.map((s, n) => (
          <button key={s.label.en} className={n === i ? 'active' : ''} onClick={() => setI(n)}>
            {s.label[lang]}
          </button>
        ))}
      </div>
    </div>
  )
}
