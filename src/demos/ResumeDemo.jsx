import { useState } from 'react'

const SAMPLE = `# Martín Salinas Scussolin
### Systems & Cloud Engineer

## Experience
- **Mynu** — Full-stack platform from zero to production
- **Cloud Migration** — Azure → AWS ECS/Fargate with Terraform
- **IAM Migration** — Zero-downtime Cognito → Clerk move

## Skills
- AWS · Terraform · Docker · GitHub Actions
- TypeScript · NestJS · React · Go`

// ponytail: tiny regex renderer for the markdown subset the sample uses,
// swap for a real parser if the demo ever needs tables/nesting
function render(md) {
  const esc = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return esc
    .split(/\n{2,}/)
    .map((block) => {
      const lines = block.trim().split('\n')
      if (lines.every((l) => l.startsWith('- ')))
        return `<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`
      return lines
        .map((l) => {
          const h = l.match(/^(#{1,3}) (.*)/)
          if (h) return `<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`
          return `<p>${inline(l)}</p>`
        })
        .join('')
    })
    .join('')
}
const inline = (s) =>
  s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>')

// Live version of the resume-generator pipeline: markdown in, styled page out.
// (The real tool then prints the HTML to PDF with headless Chrome.)
export default function ResumeDemo() {
  const [md, setMd] = useState(SAMPLE)
  return (
    <div className="demo resume-demo">
      <textarea
        value={md}
        onChange={(e) => setMd(e.target.value)}
        spellCheck={false}
        aria-label="markdown source"
      />
      <div className="resume-paper" dangerouslySetInnerHTML={{ __html: render(md) }} />
    </div>
  )
}
