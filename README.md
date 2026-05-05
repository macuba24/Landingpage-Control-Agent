# Control Agent - US Hosting Setup

This project serves both:
- Landingpage (`public/`)
- Backend API (`src/server.ts`)

## Why this setup

To improve trust and adoption in Mexico and the USA, host app and data in a US region.
`render.yaml` is configured for **US West (Oregon)** so requests and in-memory data processing stay in the US deployment region.

## What is configured

- `src/server.ts`
  - Uses `PORT` from environment (cloud-ready).
  - Binds to `0.0.0.0` (required by managed platforms).
  - Supports `PUBLIC_BASE_URL` for clean runtime logging.
- `render.yaml`
  - Deploys a single Node web service.
  - Region set to `oregon` (USA).
  - Build: `npm install && npm run build`
  - Start: `npm run start`

## Deploy on Render (US)

1. Push repository to GitHub.
2. In Render, create **New + Blueprint**.
3. Select this repo; Render reads `render.yaml`.
4. Set `PUBLIC_BASE_URL` to your Render URL (for example `https://control-agent.onrender.com`).
5. Deploy.

## Notes

- Pricing parity depends on selected plan, not US vs DE region by itself on most hosts.
- Current app state is in-memory; data persists only while the service runs.
- For production-grade persistence in US, attach a US-region managed database (for example Render Postgres in US).
