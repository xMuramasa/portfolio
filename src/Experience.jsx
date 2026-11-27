// A bullet is a string or { text, href } (a linked certificate).
function Bullet({ b }) {
  if (typeof b === 'string') return <li>{b}</li>
  return (
    <li>
      <a href={b.href} target="_blank" rel="noreferrer">{b.text}</a>
    </li>
  )
}

const key = (b) => (typeof b === 'string' ? b : b.text)

function Timeline({ entries, tag }) {
  return (
    <div className="timeline">
      {entries.map((e, i) => (
        <div key={e.role + e.company} className={e.current ? 't-item current' : 't-item'} tabIndex={0}>
          <section className="project" data-index={`${tag}_0${entries.length - 1 - i}`}>
            <div className="project-head">
              <h2>{e.role}</h2>
            </div>
            <p className="tech">{[e.company, e.period].filter(Boolean).join(' · ')}</p>
          </section>
          <ul className="bullets">
            {e.bullets.map((b) => <Bullet key={key(b)} b={b} />)}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function Experience({ entries }) {
  return <Timeline entries={entries} tag="LOG" />
}

export function Education({ entries }) {
  return entries.map((e, i) => (
    <div key={e.role + e.company} className="card-shadow">
      <section className="project" data-index={`EDU_0${i + 1}`}>
        <div className="project-head">
          <h2>{e.role}</h2>
        </div>
        <p className="tech">{[e.company, e.period].filter(Boolean).join(' · ')}</p>
        <ul className="bullets">
          {e.bullets.map((b) => <Bullet key={key(b)} b={b} />)}
        </ul>
      </section>
    </div>
  ))
}
