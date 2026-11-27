import { useRef, useState } from 'react'
import landing from '../assets/landing.webp'
import upload from '../assets/upload.webp'
import visualizer from '../assets/visualizer.webp'

const SHOTS = [
  { src: landing, label: { en: 'Landing', es: 'Inicio' } },
  { src: upload, label: { en: 'Upload + transcode', es: 'Subida + transcodificación' } },
  { src: visualizer, label: { en: 'Player window', es: 'Reproductor' } },
]
const DRAG = { en: 'drag me', es: 'arrástrame' }

// Mimics vireo's draggable player window: grab the title bar and move it.
export default function VireoDemo({ lang }) {
  const [shot, setShot] = useState(0)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const drag = useRef(null)

  function onPointerDown(e) {
    drag.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  function onPointerMove(e) {
    if (!drag.current) return
    setPos({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y })
  }

  return (
    <div className="demo vireo-stage">
      <div
        className="vireo-window"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      >
        <div
          className="vireo-titlebar"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={() => (drag.current = null)}
        >
          <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
          <span className="vireo-title">vireo — {SHOTS[shot].label[lang]} ({DRAG[lang]})</span>
        </div>
        <img src={SHOTS[shot].src} alt={`vireo ${SHOTS[shot].label[lang]}`} draggable={false} />
        <div className="vireo-tabs">
          {SHOTS.map((s, i) => (
            <button
              key={s.label.en}
              className={i === shot ? 'active' : ''}
              onClick={() => setShot(i)}
            >
              {s.label[lang]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
