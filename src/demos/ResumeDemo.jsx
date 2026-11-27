import { useMemo, useState } from 'react'

const SAMPLE = {
  en: {
    name: 'Martín Salinas Scussolin',
    title: 'Software & Cloud Engineer',
    sections: [
      { title: 'Summary', text: 'Owns systems end to end, from infrastructure to the apps people use.' },
      {
        title: 'Experience',
        bullets: [
          '**Mynu** — Kubernetes migration, ~70% lower cloud costs',
          '**Mynu App** — iOS/Android from zero to production',
          '**Auth** — Cognito → Clerk with zero downtime',
        ],
      },
      { title: 'Skills', bullets: ['AWS · Kubernetes · ArgoCD · Terraform', 'Go · TypeScript · NestJS · React'] },
    ],
  },
  es: {
    name: 'Martín Salinas Scussolin',
    title: 'Software & Cloud Engineer',
    sections: [
      { title: 'Perfil', text: 'Se hace cargo de los sistemas de principio a fin, de la infraestructura a las apps.' },
      {
        title: 'Experiencia',
        bullets: [
          '**Mynu** — migración a Kubernetes, ~70 % menos en costos cloud',
          '**Mynu App** — iOS/Android de cero a producción',
          '**Auth** — de Cognito a Clerk sin interrupciones',
        ],
      },
      { title: 'Habilidades', bullets: ['AWS · Kubernetes · ArgoCD · Terraform', 'Go · TypeScript · NestJS · React'] },
    ],
  },
}

const MSG = {
  en: { label: 'resume JSON', bad: 'Not valid JSON yet:', required: 'is required', list: 'must be a list' },
  es: { label: 'JSON del CV', bad: 'Todavía no es JSON válido:', required: 'es obligatorio', list: 'debe ser una lista' },
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const inline = (s) =>
  esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>')

// The same checks resume-generator's resume.py makes, with JSON paths in the errors.
function check(doc, m) {
  if (typeof doc?.name !== 'string' || !doc.name) return `resume.name ${m.required}`
  if (!Array.isArray(doc.sections)) return `resume.sections ${m.list}`
  for (const [i, s] of doc.sections.entries()) {
    if (typeof s?.title !== 'string' || !s.title) return `resume.sections[${i}].title ${m.required}`
    if (s.bullets !== undefined && !Array.isArray(s.bullets)) return `resume.sections[${i}].bullets ${m.list}`
  }
  return null
}

function render(doc) {
  const head = `<h1>${inline(doc.name)}</h1>${doc.title ? `<h3>${inline(doc.title)}</h3>` : ''}`
  const body = doc.sections
    .map((s) => {
      const text = s.text ? `<p>${inline(s.text)}</p>` : ''
      const list = s.bullets?.length ? `<ul>${s.bullets.map((b) => `<li>${inline(b)}</li>`).join('')}</ul>` : ''
      return `<h2>${inline(s.title)}</h2>${text}${list}`
    })
    .join('')
  return head + body
}

// resume-generator in the browser: JSON in, a styled page out. The real tool then prints the HTML to PDF with
// headless Chrome. A broken edit keeps the last good page and shows the error, as the CLI would.
export default function ResumeDemo({ lang }) {
  const m = MSG[lang]
  const [src, setSrc] = useState(() => JSON.stringify(SAMPLE[lang], null, 2))
  const [prevLang, setPrevLang] = useState(lang)
  const [last, setLast] = useState(() => render(SAMPLE[lang]))

  if (lang !== prevLang) {
    setPrevLang(lang)
    setSrc(JSON.stringify(SAMPLE[lang], null, 2))
    setLast(render(SAMPLE[lang]))
  }

  const { html, error } = useMemo(() => {
    try {
      const doc = JSON.parse(src)
      const problem = check(doc, m)
      return problem ? { error: problem } : { html: render(doc) }
    } catch (e) {
      return { error: `${m.bad} ${e.message}` }
    }
  }, [src, m])

  if (html && html !== last) setLast(html)

  return (
    <div className="demo resume-demo">
      <div className="resume-src">
        <textarea value={src} onChange={(e) => setSrc(e.target.value)} spellCheck={false} aria-label={m.label} />
        {error && <p className="demo-error">{error}</p>}
      </div>
      <div className="resume-paper" dangerouslySetInnerHTML={{ __html: html ?? last }} />
    </div>
  )
}
