// Everything the page says, in English and Spanish. Facts come from the CVs in xMuramasa/xMuramasa (resume/*.json);
// keep the two in step when one changes.

const GH = 'https://github.com/xMuramasa/'
const CV = 'https://github.com/xMuramasa/xMuramasa/releases/download/cv/'

export const LANGS = ['en', 'es']

// Nerd-font glyphs (CaskaydiaCove NF): GitHub, LinkedIn, envelope, PDF file.
export const links = (lang) => [
  { label: '\uf09b GitHub', href: 'https://github.com/xmuramasa' },
  { label: '\uf0e1 LinkedIn', href: 'https://www.linkedin.com/in/xmuramasa' },
  { label: '\uf0e0 Email', href: 'mailto:martin.salinas.scussolin@gmail.com' },
  { label: '\uf1c1 CV', href: CV + (lang === 'es' ? 'es-cv-short.pdf' : 'en-resume-short.pdf') },
  {
    label: lang === 'es' ? '\uf1c1 CV completo' : '\uf1c1 Full CV',
    href: CV + (lang === 'es' ? 'es-cv-long.pdf' : 'en-resume-long.pdf'),
  },
]

export const STACK = [
  'AWS', 'Kubernetes', 'ArgoCD', 'Terraform', 'Docker', 'GitHub Actions', 'Prometheus', 'Grafana',
  'Go', 'TypeScript', 'NestJS', 'React', 'Expo', 'SwiftUI', 'Jetpack Compose', 'Python',
  'PostgreSQL', 'MongoDB', 'Clerk', 'Cognito', 'Claude Code',
]

const repos = {
  trismegistus: [
    { label: 'Relay', href: GH + 'hermes-relay' },
    { label: 'macOS', href: GH + 'trismegistus-mac' },
    { label: 'Android', href: GH + 'trismegistus-android' },
  ],
  caduceus: [{ href: GH + 'caduceus' }],
  news: [{ href: GH + 'news-reader' }],
  img: [{ href: GH + 'img-transformer' }],
  resume: [{ href: GH + 'resume-generator' }],
  vireo: [{ href: GH + 'vireo' }],
}

const ARGO = 'https://www.udemy.com/certificate/UC-49965bee-53e3-4448-91a5-6d686af652a4/'

export const CONTENT = {
  en: {
    meta: {
      title: 'Martín Salinas Scussolin — Software & Cloud Engineer',
      description:
        'Portfolio of Martín Salinas Scussolin, software and cloud engineer: cloud infrastructure, backend systems, native apps and agentic development.',
    },
    langLabel: 'Language',
    role: 'Software & Cloud Engineer',
    tagline:
      "I own systems end to end, from infrastructure to the apps people use. I work with an agentic workflow, keeping architecture and review in my hands, and I'm growing toward software architecture.",
    where: 'Santiago, Chile · Open to remote · English: professional proficiency',
    source: 'Source',
    how: {
      title: 'How I work',
      items: [
        {
          title: 'Agents implement, I decide',
          text: 'Claude Code agents do most of the implementation; the architecture, the review and the hand edits are mine.',
        },
        {
          title: 'End to end',
          text: 'From Terraform and Kubernetes to the mobile app people open: I design it, ship it and keep it running.',
        },
        {
          title: 'Small, checked steps',
          text: 'Every change is an issue, a branch and a pull request that passes its gates before it merges. Caduceus automates that loop.',
        },
      ],
    },
    tabs: { projects: 'projects', experience: 'experience', education: 'education' },
    projects: [
      {
        id: 'trismegistus',
        name: 'Trismegistus',
        tech: ['Go', 'SQLite', 'WebSocket', 'SwiftUI', 'Jetpack Compose', 'JSON Schema'],
        blurb:
          'Native companion apps for a self-hosted AI agent. A Go relay keeps every run alive across flaky mobile connections and replays missed events to any device; a SwiftUI menu-bar app for macOS and a Jetpack Compose app for Android talk to it. All three test against the same JSON Schema protocol.',
        demoNote: 'Both apps: Android screens from the automated QA run, macOS from the design the app follows.',
      },
      {
        id: 'caduceus',
        name: 'Caduceus',
        tech: ['Go', 'systemd', 'GitHub API', 'Claude Code'],
        blurb:
          "The engine of my development workflow, in Go. It checks that an issue is ready, starts a headless Claude Code run in its own worktree with the repo's rules and allowed commands, and lines the result up for review; a merge queue lands each PR once its gates pass on the updated branch.",
        demoNote: 'A replay of one task going through it (simplified):',
      },
      {
        id: 'news',
        name: 'news-reader',
        tech: ['Bun', 'zod', 'MongoDB', 'React 19', 'Tailwind', 'shadcn/ui'],
        blurb:
          'Daily AI, cyber and Chile news briefings that an agent writes as schema-validated JSON editions. A Bun API validates them with zod and splits them into tagged stories in MongoDB; a React 19 reader built with Tailwind and shadcn/ui shows them on phone and desktop, with tag search and favorites.',
        demoNote: 'A made-up edition in the news-edition/v1 shape: switch between the JSON the agent writes and what readers see.',
      },
      {
        id: 'img',
        name: 'img-transformer',
        tech: ['Python', 'FastAPI', 'Pillow', 'Docker'],
        blurb:
          'A FastAPI service that converts, resizes and compresses images (single files, batches or whole zip archives), optimizes images for PDFs and strips backgrounds. It started as a Jupyter notebook and is now a tested, Dockerized app with a pure-Python core and a drag-and-drop UI.',
        demoNote: 'Live demo: runs the same conversion in your browser.',
      },
      {
        id: 'resume',
        name: 'resume-generator',
        tech: ['Python (stdlib only)', 'Headless Chrome', 'GitHub Actions'],
        blurb:
          'Resume JSON → Markdown, HTML and PDF through headless Chrome, with no dependencies. A GitHub Action rebuilds my CVs on every change and fails if a page overflows; the CV links on this page come from it.',
        demoNote: 'Live demo: edit the JSON, watch the page render.',
      },
      {
        id: 'vireo',
        name: 'vireo',
        tech: ['Bun', 'Hono', 'React', 'Postgres', 'Clerk', 'ffmpeg', 'HLS'],
        blurb:
          'An HLS streaming service: upload a video, watch it transcode in place, then play it back in a draggable window that adopts each video’s aspect ratio. Bun + Hono API with Clerk auth and Postgres; Vite + React frontend with hls.js.',
        demoNote: 'The player window is draggable, just like the real one.',
      },
    ],
    jobs: [
      {
        role: 'Software Engineer (Cloud & Platform)',
        company: 'Mynu.ai',
        period: 'Mar 2024 – Present · Santiago, Chile',
        current: true,
        bullets: [
          'Sole infrastructure engineer: planned and led the ECS/Fargate → Kubernetes (k3s) migration with Terraform and ArgoCD GitOps, cutting monthly cloud costs by ~70%; consolidated three Aurora instances into a single RDS instance.',
          'Set up monitoring (Prometheus, Grafana, Alertmanager, CloudWatch) to measure resource utilization, which guided the cost-reduction work.',
          'Built a queue-driven PDF report service for bulk B2B distribution (~150 queued reports tested with real users) and a shared library for genetic-predisposition calculations.',
          "Created the team's Claude Code skills (spec → issue → stacked PRs → automated review), available org-wide; administer GitHub Enterprise and review teammates' and AI-generated code.",
          'Shipped the Mynu App (iOS/Android) and web platforms from zero to production with React Native (Expo) and React; earlier led the Azure → AWS ECS/Fargate migration.',
          'Migrated auth from Cognito to Clerk with zero downtime or data loss.',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'Zippedi Inc.',
        period: 'Jun 2022 – Oct 2023 · Santiago, Chile',
        bullets: [
          'Built customer mobile-app features, revamped the internal task-management platform and upgraded the QA platform.',
        ],
      },
      {
        role: 'Junior Cybersecurity Engineer (Intern)',
        company: 'NTT DATA Europe & LATAM',
        period: 'Jan 2022 – Feb 2022 · Santiago, Chile',
        bullets: [
          "Assessed clients' Azure networks; drafted security docs and Cyber Kill Chain response guides; researched ISO 27001.",
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
    ],
    education: [
      {
        role: 'Professional degree in Computer Engineering',
        company: 'Universidad Técnica Federico Santa María',
        period: '2017 – 2023 · Santiago, Chile',
        bullets: [
          'Ingeniero Civil Informático (professional title) · B.Sc. in Engineering Sciences',
          'Thesis: machine-learning classifier for 1D cellular automata (98.5% accuracy).',
        ],
      },
      {
        role: 'Certifications',
        company: 'Udemy',
        bullets: [
          { text: 'Argo CD and Argo Rollouts for GitOps: The Definitive Guide · Nov 2026', href: ARGO },
          'Docker Mastery: Kubernetes & Swarm · Nov 2024',
          'Go - The Complete Guide · Jan 2024',
        ],
      },
    ],
    footer: 'built with React + Vite',
  },

  es: {
    meta: {
      title: 'Martín Salinas Scussolin — Software & Cloud Engineer',
      description:
        'Portafolio de Martín Salinas Scussolin, ingeniero de software y cloud: infraestructura cloud, sistemas backend, apps nativas y desarrollo con agentes de IA.',
    },
    langLabel: 'Idioma',
    role: 'Software & Cloud Engineer',
    tagline:
      'Me hago cargo de los sistemas de principio a fin, desde la infraestructura hasta las apps que usan las personas. Trabajo con un flujo basado en agentes de IA, con la arquitectura y la revisión en mis manos, y quiero crecer hacia la arquitectura de software.',
    where: 'Santiago, Chile · Abierto a trabajo remoto · Inglés: nivel profesional',
    source: 'Código',
    how: {
      title: 'Cómo trabajo',
      items: [
        {
          title: 'Los agentes implementan, yo decido',
          text: 'Los agentes de Claude Code hacen la mayor parte de la implementación; la arquitectura, la revisión y las ediciones a mano son mías.',
        },
        {
          title: 'De principio a fin',
          text: 'Desde Terraform y Kubernetes hasta la app que abren las personas: la diseño, la lanzo y la mantengo funcionando.',
        },
        {
          title: 'Pasos pequeños y verificados',
          text: 'Cada cambio es un issue, una rama y un pull request que pasa sus checks antes de integrarse. Caduceus automatiza ese ciclo.',
        },
      ],
    },
    tabs: { projects: 'proyectos', experience: 'experiencia', education: 'educación' },
    projects: [
      {
        id: 'trismegistus',
        name: 'Trismegistus',
        tech: ['Go', 'SQLite', 'WebSocket', 'SwiftUI', 'Jetpack Compose', 'JSON Schema'],
        blurb:
          'Apps nativas para un agente de IA autoalojado. Un relay en Go mantiene viva cada ejecución aunque se corte la conexión móvil y reproduce los eventos perdidos en cualquier dispositivo; una app de barra de menús en SwiftUI para macOS y una app en Jetpack Compose para Android se conectan a él. Las tres se prueban contra el mismo protocolo en JSON Schema.',
        demoNote: 'Las dos apps: pantallas de Android de la prueba automatizada y de macOS del diseño que sigue la app.',
      },
      {
        id: 'caduceus',
        name: 'Caduceus',
        tech: ['Go', 'systemd', 'GitHub API', 'Claude Code'],
        blurb:
          'El motor de mi flujo de desarrollo, en Go. Verifica que un issue esté listo, lanza una ejecución headless de Claude Code en su propio worktree con las reglas y los comandos permitidos del repo, y deja el resultado listo para revisión; una cola de merge integra cada PR cuando sus checks pasan sobre la rama actualizada.',
        demoNote: 'Una repetición de una tarea pasando por él (simplificada):',
      },
      {
        id: 'news',
        name: 'news-reader',
        tech: ['Bun', 'zod', 'MongoDB', 'React 19', 'Tailwind', 'shadcn/ui'],
        blurb:
          'Resúmenes diarios de noticias de IA, ciberseguridad y Chile que un agente escribe como ediciones JSON validadas por un schema. Una API en Bun las valida con zod y las divide en historias etiquetadas en MongoDB; un lector en React 19 hecho con Tailwind y shadcn/ui las muestra en el teléfono y el escritorio, con búsqueda por etiquetas y favoritos.',
        demoNote: 'Una edición inventada con la forma de news-edition/v1: cambia entre el JSON que escribe el agente y lo que ven los lectores.',
      },
      {
        id: 'img',
        name: 'img-transformer',
        tech: ['Python', 'FastAPI', 'Pillow', 'Docker'],
        blurb:
          'Un servicio FastAPI que convierte, redimensiona y comprime imágenes (archivos sueltos, lotes o archivos zip completos), las optimiza para PDFs y quita fondos. Partió como un notebook de Jupyter y hoy es una app probada y en Docker, con un núcleo en Python puro y una interfaz de arrastrar y soltar.',
        demoNote: 'Demo en vivo: hace la misma conversión en tu navegador.',
      },
      {
        id: 'resume',
        name: 'resume-generator',
        tech: ['Python (solo stdlib)', 'Chrome headless', 'GitHub Actions'],
        blurb:
          'JSON de CV → Markdown, HTML y PDF con Chrome headless, sin dependencias. Una GitHub Action reconstruye mis CVs con cada cambio y falla si una página se desborda; los enlaces al CV de esta página salen de ahí.',
        demoNote: 'Demo en vivo: edita el JSON y mira cómo se arma la página.',
      },
      {
        id: 'vireo',
        name: 'vireo',
        tech: ['Bun', 'Hono', 'React', 'Postgres', 'Clerk', 'ffmpeg', 'HLS'],
        blurb:
          'Un servicio de streaming HLS: subes un video, ves cómo se transcodifica y lo reproduces en una ventana arrastrable que adopta la proporción de cada video. API en Bun + Hono con autenticación de Clerk y Postgres; frontend en Vite + React con hls.js.',
        demoNote: 'La ventana del reproductor se puede arrastrar, igual que la real.',
      },
    ],
    jobs: [
      {
        role: 'Software Engineer (Cloud & Platform)',
        company: 'Mynu.ai',
        period: 'Mar 2024 – Actualidad · Santiago, Chile',
        current: true,
        bullets: [
          'Único ingeniero de infraestructura: planifiqué y lideré la migración de ECS/Fargate a Kubernetes (k3s) con Terraform y ArgoCD, reduciendo en ~70\u00a0% los costos cloud mensuales; consolidé tres instancias Aurora en una sola instancia RDS.',
          'Puse en marcha el monitoreo (Prometheus, Grafana, Alertmanager, CloudWatch) para medir el uso de recursos, lo que guio la reducción de costos.',
          'Construí un servicio de reportes PDF basado en colas para distribución masiva B2B (~150 reportes en cola probados con usuarios reales) y una librería compartida para los cálculos de predisposición genética.',
          'Creé las skills de Claude Code del equipo (especificación → issue → PRs apilados → revisión automática), disponibles para toda la organización; administro GitHub Enterprise y reviso el código del equipo y el generado por IA.',
          'Lancé Mynu App (iOS/Android) y plataformas web de cero a producción con React Native (Expo) y React; antes lideré la migración de Azure a AWS ECS/Fargate.',
          'Migré la autenticación de Cognito a Clerk sin interrupciones ni pérdida de datos.',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'Zippedi Inc.',
        period: 'Jun 2022 – Oct 2023 · Santiago, Chile',
        bullets: [
          'Desarrollé funcionalidades para la app móvil de clientes, renové la plataforma interna de tareas y mejoré la de QA.',
        ],
      },
      {
        role: 'Junior Cybersecurity Engineer (Intern)',
        company: 'NTT DATA Europe & LATAM',
        period: 'Ene 2022 – Feb 2022 · Santiago, Chile',
        bullets: [
          'Evalué redes Azure de clientes; redacté documentación y guías frente a la Cyber Kill Chain; investigué ISO 27001.',
        ],
      },
      {
        role: 'Operations Engineer (Intern)',
        company: 'ITD Telecom',
        period: 'Ene 2021 – Ago 2021 · Santiago, Chile',
        bullets: [
          'Di soporte a la infraestructura de hosting y al ticketing con GLPI; monitoreé sistemas con Cacti y aporté a políticas de SLA.',
        ],
      },
    ],
    education: [
      {
        role: 'Ingeniería Civil Informática',
        company: 'Universidad Técnica Federico Santa María',
        period: '2017 – 2023 · Santiago, Chile',
        bullets: [
          'Ingeniero Civil Informático (título profesional) · Licenciado en Ciencias de la Ingeniería',
          'Tesis: clasificador de machine learning para autómatas celulares 1D (98,5\u00a0% de precisión).',
        ],
      },
      {
        role: 'Certificaciones',
        company: 'Udemy',
        bullets: [
          { text: 'Argo CD and Argo Rollouts for GitOps: The Definitive Guide · Nov 2026', href: ARGO },
          'Docker Mastery: Kubernetes & Swarm · Nov 2024',
          'Go - The Complete Guide · Ene 2024',
        ],
      },
    ],
    footer: 'hecho con React + Vite',
  },
}

export const REPOS = repos
