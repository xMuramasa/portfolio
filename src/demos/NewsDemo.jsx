import { useMemo, useState } from 'react'

// A made-up edition in the news-edition/v1 shape (trimmed). The stories are about this portfolio's own projects,
// so nothing here pretends to be real news.
const EDITIONS = {
  en: {
    schema: 'news-edition/v1',
    feed: 'demo',
    edition_date: '2026-11-27',
    title: 'Demo edition — 27 November 2026',
    lead: 'A sample of the format: an agent writes the edition, the API validates it, the reader shows it.',
    language: 'en',
    stories: [
      {
        slug: 'caduceus-goes-public',
        section: 'top',
        rank: 1,
        headline: 'Caduceus, the engine behind this workflow, is now public under MIT',
        summary: 'Issue to merged pull request: eligibility checks, headless Claude Code runs, gates and a merge queue.',
        verification: 'confirmed',
        tags: ['go', 'agents', 'open-source'],
        sources: [{ outlet: 'GitHub', url: 'https://github.com/xMuramasa/caduceus' }],
      },
      {
        slug: 'trismegistus-three-repos',
        section: 'top',
        rank: 2,
        headline: 'Trismegistus ships as three repos: a Go relay and two native apps',
        summary: 'The macOS and Android clients test against the same JSON Schema protocol as the relay.',
        verification: 'confirmed',
        tags: ['go', 'swiftui', 'android', 'open-source'],
        sources: [{ outlet: 'GitHub', url: 'https://github.com/xMuramasa/hermes-relay' }],
      },
      {
        slug: 'portfolio-spanish',
        section: 'brief',
        rank: 3,
        headline: 'This portfolio now speaks Spanish',
        summary: 'Use the EN / ES toggle at the top; the choice is remembered.',
        verification: 'confirmed',
        tags: ['react', 'i18n'],
        sources: [{ outlet: 'GitHub', url: 'https://github.com/xMuramasa/portfolio' }],
      },
    ],
  },
  es: {
    schema: 'news-edition/v1',
    feed: 'demo',
    edition_date: '2026-11-27',
    title: 'Edición de prueba — 27 de noviembre de 2026',
    lead: 'Una muestra del formato: un agente escribe la edición, la API la valida y el lector la muestra.',
    language: 'es',
    stories: [
      {
        slug: 'caduceus-publico',
        section: 'top',
        rank: 1,
        headline: 'Caduceus, el motor de este flujo de trabajo, ya es público con licencia MIT',
        summary: 'Del issue al pull request integrado: verificaciones, ejecuciones headless de Claude Code, checks y una cola de merge.',
        verification: 'confirmed',
        tags: ['go', 'agentes', 'open-source'],
        sources: [{ outlet: 'GitHub', url: 'https://github.com/xMuramasa/caduceus' }],
      },
      {
        slug: 'trismegistus-tres-repos',
        section: 'top',
        rank: 2,
        headline: 'Trismegistus llega en tres repos: un relay en Go y dos apps nativas',
        summary: 'Los clientes de macOS y Android se prueban contra el mismo protocolo en JSON Schema que el relay.',
        verification: 'confirmed',
        tags: ['go', 'swiftui', 'android', 'open-source'],
        sources: [{ outlet: 'GitHub', url: 'https://github.com/xMuramasa/hermes-relay' }],
      },
      {
        slug: 'portafolio-espanol',
        section: 'brief',
        rank: 3,
        headline: 'Este portafolio ahora también está en español',
        summary: 'Usa el selector EN / ES de arriba; la elección queda guardada.',
        verification: 'confirmed',
        tags: ['react', 'i18n'],
        sources: [{ outlet: 'GitHub', url: 'https://github.com/xMuramasa/portfolio' }],
      },
    ],
  },
}

const MSG = {
  en: { reader: 'Reader', json: 'JSON', all: 'all', filter: 'Filter by tag', verified: 'confirmed' },
  es: { reader: 'Lector', json: 'JSON', all: 'todas', filter: 'Filtrar por etiqueta', verified: 'confirmada' },
}

export default function NewsDemo({ lang }) {
  const m = MSG[lang]
  const edition = EDITIONS[lang]
  const [view, setView] = useState('reader')
  const [tag, setTag] = useState(null)

  const tags = useMemo(() => [...new Set(edition.stories.flatMap((s) => s.tags))], [edition])
  const active = tags.includes(tag) ? tag : null
  const stories = active ? edition.stories.filter((s) => s.tags.includes(active)) : edition.stories

  return (
    <div className="demo news-demo">
      <div className="vireo-tabs news-switch">
        {['reader', 'json'].map((v) => (
          <button key={v} className={view === v ? 'active' : ''} aria-pressed={view === v} onClick={() => setView(v)}>
            {m[v]}
          </button>
        ))}
      </div>

      {view === 'json' ? (
        <pre className="news-json">{JSON.stringify(edition, null, 2)}</pre>
      ) : (
        <div className="news-reader">
          <p className="news-date">{edition.edition_date} · {edition.feed}</p>
          <h3 className="news-title">{edition.title}</h3>
          <p className="news-lead">{edition.lead}</p>
          <div className="news-tags" role="group" aria-label={m.filter}>
            <button className={active ? '' : 'active'} onClick={() => setTag(null)}>{m.all}</button>
            {tags.map((t) => (
              <button key={t} className={active === t ? 'active' : ''} onClick={() => setTag(t)}>#{t}</button>
            ))}
          </div>
          {stories.map((s) => (
            <article key={s.slug} className="news-story">
              <p className="news-meta">
                <span className="news-section">{s.section}</span>
                <span className="news-badge">✓ {m.verified}</span>
              </p>
              <h4>{s.headline}</h4>
              <p>{s.summary}</p>
              <p className="news-src">
                {s.sources.map((src) => (
                  <a key={src.url} href={src.url} target="_blank" rel="noreferrer">{src.outlet} ↗</a>
                ))}
                {' · '}
                {s.tags.map((t) => `#${t}`).join(' ')}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
