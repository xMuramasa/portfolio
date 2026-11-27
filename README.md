# portfolio

Martín Salinas Scussolin's portfolio at [x-muramasa.dev](https://x-muramasa.dev): React + Vite, in English and
Spanish (toggle at the top, or `?lang=es`).

Each project card has a live demo:

- **Trismegistus**: the macOS and Android screens.
- **Caduceus**: a replay of one task going from issue to merge.
- **news-reader**: a sample edition, as JSON or in the reader.
- **img-transformer**: WebP conversion in the browser.
- **resume-generator**: resume JSON rendered as a page.
- **vireo**: the draggable player window.

All text lives in [`src/content.js`](src/content.js). The experience and education facts come from the CVs in
[xMuramasa/xMuramasa](https://github.com/xMuramasa/xMuramasa/tree/main/resume); keep both in step.

## Develop

```sh
bun install
bun run dev
bun run lint
bun run build
```

## Deploy

The site is an assets-only Cloudflare Worker ([`wrangler.jsonc`](wrangler.jsonc)) serving `dist/`. Cloudflare Workers
Builds builds and deploys it on every push to `main`. The Vite `base` defaults to `/`; set `BASE_PATH` for a host that
serves from a subpath.
