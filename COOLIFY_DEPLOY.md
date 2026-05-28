# Deploying to Coolify

This template is a pure static React app served by nginx. No backend required.

## Quick Start

1. Push this repo to GitHub/GitLab
2. In Coolify → New Resource → Docker → point to your repo
3. Coolify will auto-detect the `Dockerfile` and build it
4. Set port to `80`

## Environment Variables (optional)

Set these in Coolify's Environment Variables panel:

| Variable | Description |
|---|---|
| `VITE_APP_TITLE` | Browser tab title (default: "Mr. Brand") |

All other `VITE_*` variables from the Manus dev environment are **not required** for self-hosting and can be left unset.

## Custom Analytics

Open `client/index.html` and replace the analytics comment with your own script tag (Plausible, Umami, GA4, etc.).

## Custom Domain

Set your domain in Coolify → Domains. SSL is handled automatically via Let's Encrypt.

## Image Assets

All images are bundled in `client/public/images/` — no external CDN dependencies. Replace them freely with your client's brand photography.
