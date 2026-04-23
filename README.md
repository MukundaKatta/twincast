# TwinCast

Clone yourself on video. Record once. Speak any script, in any language, on every platform. Made for creators, priced for creators.

**Status:** v0 skeleton — landing page + one selfie-to-video mock route. Full rendering not yet wired.

**Landing:** https://twincast.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | v0 selfie + script upload — mocked video rendering with progress bar |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma |

## What's next

- Wire real video generation (avatar cloning + lip-sync)
- Multi-language output selection
- Auth + per-user project history
