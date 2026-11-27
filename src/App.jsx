import { useEffect, useState } from 'react'
import Experience, { Education } from './Experience'
import { CONTENT, LANGS, REPOS, STACK, links } from './content'
import TrismegistusDemo from './demos/TrismegistusDemo'
import CaduceusDemo from './demos/CaduceusDemo'
import NewsDemo from './demos/NewsDemo'
import ImgDemo from './demos/ImgDemo'
import ResumeDemo from './demos/ResumeDemo'
import VireoDemo from './demos/VireoDemo'
import './App.css'

const DEMOS = {
  trismegistus: TrismegistusDemo,
  caduceus: CaduceusDemo,
  news: NewsDemo,
  img: ImgDemo,
  resume: ResumeDemo,
  vireo: VireoDemo,
}
const TABS = ['projects', 'experience', 'education']

// ?lang= wins (shareable links, screenshots), then the last choice, then the browser's language.
function initialLang() {
  const q = new URLSearchParams(location.search).get('lang')
  if (LANGS.includes(q)) return q
  const saved = localStorage.getItem('lang')
  if (LANGS.includes(saved)) return saved
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

const tabFromHash = () => (TABS.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'projects')

export default function App() {
  const [lang, setLang] = useState(initialLang)
  const [tab, setTab] = useState(tabFromHash)
  const t = CONTENT[lang]

  useEffect(() => {
    const onMove = (e) => {
      const s = document.documentElement.style
      s.setProperty('--mx', e.clientX / innerWidth - 0.5)
      s.setProperty('--my', e.clientY / innerHeight - 0.5)
    }
    const onHash = () => setTab(tabFromHash())
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('hashchange', onHash)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('hashchange', onHash)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang, t])

  function chooseLang(l) {
    setLang(l)
    localStorage.setItem('lang', l)
    const url = new URL(location.href)
    url.searchParams.delete('lang')
    history.replaceState(null, '', url)
  }

  function chooseTab(name) {
    setTab(name)
    history.replaceState(null, '', `${location.pathname}${location.search}#${name}`)
  }

  return (
    <>
      <header className="hero">
        <div className="hero-top">
          <h1>Martín Salinas Scussolin</h1>
          <div className="lang-toggle" role="group" aria-label={t.langLabel}>
            {LANGS.map((l) => (
              <button key={l} className={l === lang ? 'active' : ''} aria-pressed={l === lang} onClick={() => chooseLang(l)}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <p className="role">{t.role}</p>
        <p className="where">{t.where}</p>
        <p className="tagline">{t.tagline}</p>
        <nav className="links">
          {links(lang).map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
          ))}
        </nav>
      </header>

      <section className="stack">
        {STACK.map((s) => <span key={s} className="chip">{s}</span>)}
      </section>

      <section className="how" aria-labelledby="how-title">
        <h2 id="how-title">{t.how.title}</h2>
        <div className="how-grid">
          {t.how.items.map((item, i) => (
            <div key={item.title} className="how-item">
              <span className="how-index">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <nav className="tabs">
        {TABS.map((name) => (
          <button key={name} className={tab === name ? 'active' : ''} onClick={() => chooseTab(name)}>
            {t.tabs[name]}
          </button>
        ))}
      </nav>

      <main>
        {tab === 'experience' && <Experience entries={t.jobs} />}
        {tab === 'education' && <Education entries={t.education} />}
        {tab === 'projects' && t.projects.map(({ id, name, tech, blurb, demoNote }, i) => {
          const Demo = DEMOS[id]
          return (
            <div key={id} className="card-shadow">
              <section className="project" data-index={`SYS_0${i + 1}`}>
                <div className="project-head">
                  <h2>{name}</h2>
                  <div className="btns">
                    {REPOS[id].map((r) => (
                      <a key={r.href} className="btn" href={r.href} target="_blank" rel="noreferrer">
                        {r.label ?? t.source} ↗
                      </a>
                    ))}
                  </div>
                </div>
                <p className="tech">{tech.join(' · ')}</p>
                <p>{blurb}</p>
                <p className="demo-note">{demoNote}</p>
                <Demo lang={lang} />
              </section>
            </div>
          )
        })}
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Martín Salinas Scussolin · {t.footer}</p>
      </footer>
    </>
  )
}
