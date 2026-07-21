const JOBS = [
  {
    role: 'Software Engineer (Systems & Cloud)',
    company: 'Mynu.ai',
    period: 'Mar 2024 – Present · Santiago, Chile',
    bullets: [
      'Built Mynu App (iOS/Android) mobile-first architecture and web platforms from zero to production using React Native (Expo) and React.',
      'Led Azure→AWS ECS/Fargate migration and built a Terraform (SQS/Lambda) event-driven notifications microservice.',
      'Migrated auth from AWS Cognito to Clerk with zero downtime/data loss; automated CI/CD via GitHub Actions and Secrets Manager.',
      'Cut third-party API latency by 2s via in-memory caching and ALB Sticky Sessions; designed least-privilege VPC networking.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Zippedi Inc.',
    period: 'Jun 2022 – Oct 2023 · Santiago, Chile',
    bullets: [
      'Shipped features for customer-facing mobile/web apps (Shape-Up and agile sprints); built and maintained internal QA tooling.',
    ],
  },
  {
    role: 'Junior Cybersecurity Engineer (Intern)',
    company: 'NTT DATA Europe & LATAM',
    period: 'Jan 2022 – Feb 2022 · Santiago, Chile',
    bullets: [
      'Assessed Azure network security for corporate clients; researched Cyber Kill Chain and ISO 27001-aligned threat modeling.',
    ],
  },
  {
    role: 'Operations Engineer (Intern)',
    company: 'ITD Telecom',
    period: 'Jan 2021 – Aug 2021 · Santiago, Chile',
    bullets: [
      'Supported hosting infrastructure and GLPI ticketing; monitored systems with Cacti; contributed to internal SLA policy.',
    ],
  },
]

const EDUCATION = [
  {
    role: 'B.Sc. Computer Science Engineering',
    company: 'Universidad Técnica Federico Santa María',
    period: '2017 – 2023 · Santiago, Chile',
    bullets: ['5-year professional degree. Thesis: high-accuracy ML model for 1D cellular automata classification.'],
  },
  {
    role: 'Certifications',
    company: 'Udemy',
    period: '',
    bullets: ['Docker Mastery: Kubernetes & Swarm', 'Go — The Complete Guide'],
  },
]

function Timeline({ entries, tag }) {
  return (
    <div className="timeline">
      {entries.map((e, i) => (
        <div
          key={e.role + e.company}
          className={/present/i.test(e.period) ? 't-item current' : 't-item'}
          tabIndex={0}
        >
          <section className="project" data-index={`${tag}_0${entries.length - 1 - i}`}>
            <div className="project-head">
              <h2>{e.role}</h2>
            </div>
            <p className="tech">{[e.company, e.period].filter(Boolean).join(' · ')}</p>
          </section>
          <ul className="bullets">
            {e.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function Experience() {
  return <Timeline entries={JOBS} tag="LOG" />
}

export function Education() {
  return EDUCATION.map((e, i) => (
    <div key={e.role + e.company} className="card-shadow">
    <section className="project" data-index={`EDU_0${i + 1}`}>
      <div className="project-head">
        <h2>{e.role}</h2>
      </div>
      <p className="tech">{[e.company, e.period].filter(Boolean).join(' · ')}</p>
      <ul className="bullets">
        {e.bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
    </section>
    </div>
  ))
}
