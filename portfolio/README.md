# Ideaforge — Portfolio

Original frontend concept for an independent digital product studio, inspired by premium SaaS experiences but with its own identity ("From idea to impact."). Frontend-only (no backend/auth/CMS).

## Stack
- Next.js App Router (TypeScript, React 19, Turbopack-ready)
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Motion for React (transitions/entrances)
- Lucide React

## Run locally
```bash
cd portfolio
npm install
npm run dev
```
Open http://localhost:3000. Build and preview with `npm run build && npm run start`.

## Deploy
Static-first output; deployable to Vercel, Netlify, Cloudflare Pages, or any Node host.

## Visual approach
- Custom-built React/CSS mockups (no stock photos, no hotlinking).
- Central design tokens in `app/globals.css` with Tailwind v4 `@theme`.
- `.mk` mockup container-query system for consistent scaling across breakpoints.

## Assets & fonts
Space Grotesk, Inter, Geist Mono via `next/font/google`.

## Limitations (deliberate)
- Illustrative concepts — no real clients, metrics, testimonials, or contact details.
- `/contact` inquiry form is client-side only; when an email is configured in `lib/site-config.ts` it can offer a prefilled mailto.
- Some scroll-timed effects may differ slightly across devices.
- Reduced motion is respected; keyboard accessibility is supported for tabs, accordion, and form.