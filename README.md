# portfolio

Personal portfolio — React + Vite, deployed to GitHub Pages.

Each project card has a live demo: in-browser WebP conversion (img-transformer),
a markdown → resume renderer (resume-generator), and a draggable player window
(vireo).

## Develop

```sh
bun install
bun run dev
```

## Deploy

Pushing to `main` builds and deploys via `.github/workflows/deploy.yml`.
The Vite `base` defaults to `/portfolio/`; override with `BASE_PATH` for other hosts.
