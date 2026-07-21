import ImgDemo from './demos/ImgDemo'
import ResumeDemo from './demos/ResumeDemo'
import VireoDemo from './demos/VireoDemo'
import './App.css'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/xmuramasa' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/xmuramasa' },
  { label: 'Email', href: 'mailto:martin.salinas.scussolin@gmail.com' },
]

const STACK = [
  'AWS', 'Terraform', 'Docker', 'GitHub Actions',
  'TypeScript', 'NestJS', 'React', 'Expo', 'Go', 'Python',
  'PostgreSQL', 'DynamoDB', 'Clerk', 'Cognito',
]

const PROJECTS = [
  {
    name: 'img-transformer',
    repo: 'https://github.com/xMuramasa/img-transformer',
    tech: ['Python', 'FastAPI', 'Pillow', 'Docker'],
    blurb:
      'A FastAPI service that converts and resizes images — single files, batches, or whole zip archives — plus batch PDF optimization. Started life as a Jupyter notebook, now a production-shaped app with a pure-Python core and a drag-and-drop UI.',
    demoNote: 'Live demo — runs the same conversion in your browser:',
    Demo: ImgDemo,
  },
  {
    name: 'resume-generator',
    repo: 'https://github.com/xMuramasa/resume',
    tech: ['Python (stdlib only)', 'Headless Chrome'],
    blurb:
      'Markdown resume → PDF via headless Chrome. Zero dependencies, no venv: a tiny markdown renderer, an HTML template, and Chrome doing the printing. My actual CVs are built with it.',
    demoNote: 'Live demo — edit the markdown, watch the resume render:',
    Demo: ResumeDemo,
  },
  {
    name: 'vireo',
    repo: 'https://github.com/xMuramasa/hls_service_test',
    tech: ['Bun', 'Hono', 'React', 'Postgres', 'Clerk', 'ffmpeg', 'HLS'],
    blurb:
      'An HLS streaming service: upload a video, watch it transcode in place, then play it back in a draggable window that adopts each video’s aspect ratio. Bun + Hono API with Clerk auth and Postgres; Vite + React frontend with hls.js.',
    demoNote: 'The player window is draggable — just like the real one:',
    Demo: VireoDemo,
  },
]

export default function App() {
  return (
    <>
      <header className="hero">
        <h1>Martín Salinas Scussolin</h1>
        <p className="role">Systems &amp; Cloud Engineer</p>
        <p className="tagline">
          I build scalable backend systems, cloud infrastructure, and automation —
          from Expo/React clients through NestJS services to Terraform-managed AWS,
          with a focus on reliability, security, and maintainability.
        </p>
        <nav className="links">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
          ))}
        </nav>
      </header>

      <section className="stack">
        {STACK.map((t) => <span key={t} className="chip">{t}</span>)}
      </section>

      <main>
        {PROJECTS.map(({ name, repo, tech, blurb, demoNote, Demo }) => (
          <section key={name} className="project">
            <div className="project-head">
              <h2>{name}</h2>
              <a className="btn" href={repo} target="_blank" rel="noreferrer">Source ↗</a>
            </div>
            <p className="tech">{tech.join(' · ')}</p>
            <p>{blurb}</p>
            <p className="demo-note">{demoNote}</p>
            <Demo />
          </section>
        ))}
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Martín Salinas Scussolin · built with React + Vite</p>
      </footer>
    </>
  )
}
