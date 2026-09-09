# Rogue RP Website

Official website for **Rogue RP**, a serious British FiveM roleplay community.

Tagline: **SERIOUS ROLEPLAY. REALISTIC STORIES. YOUR CHOICE.**

This is a custom Next.js application. It is not a FiveM website template.

## Features

- Cinematic public site with Rogue RP branding and the supplied circular emblem
- Live FiveM server status and player count through a server-side API
- Staff username and password login with encrypted HTTP-only sessions
- Server-side Discord role checks for `/admin`
- Application dashboard that consumes the existing Rogue RP Discord applications bot
- Configurable departments, rules, FAQ, team, news and media
- Staff tools for applications, users, news, media, team, departments, rules, FAQ, server and settings
- Custom 404, loading and error states
- SEO metadata, sitemap, robots and optional PWA manifest
- Vercel-compatible serverless architecture

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- `jose` encrypted session cookies
- Vercel serverless deployment

## Local installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Environment variables

Copy `.env.example` to `.env.local`. Never commit `.env` or `.env.local`.

Public variables (safe in the browser):

- `NEXT_PUBLIC_SITE_URL` — canonical site URL, for example `https://roguerp.co.uk`
- `NEXT_PUBLIC_DISCORD_INVITE` — public Discord invite
- `NEXT_PUBLIC_ANALYTICS_PROVIDER` — `none`, `console` or a later provider
- `NEXT_PUBLIC_ANALYTICS_WRITE_KEY` — optional provider key

Private variables (server only):

- `DISCORD_BOT_TOKEN`
- `DISCORD_GUILD_ID`
- `DISCORD_ROLE_OWNER`
- `DISCORD_ROLE_DIRECTOR`
- `DISCORD_ROLE_MANAGEMENT`
- `DISCORD_ROLE_ADMINISTRATOR`
- `DISCORD_ROLE_MODERATOR`
- `DISCORD_ROLE_DEVELOPMENT`
- `APPLICATION_API_URL`
- `APPLICATION_API_KEY`
- `APPLICATION_START_URL`
- `FIVEM_SERVER_IP` — hostname or IP, currently `play.rogueroleplay.co.uk`
- `FIVEM_SERVER_PORT` — currently `30120`
- `FIVEM_CONNECT_CODE` — currently `vqqd59q`
- `FIVEM_CONNECT_URL` — currently `https://cfx.re/join/vqqd59q`
- `FIVEM_MAX_PLAYERS` — fallback only; live `sv_maxclients` is preferred
- `SESSION_SECRET` — at least 32 random characters
- `STAFF_USERNAME` — staff login username (default `admin`)
- `STAFF_ACCESS_CODE` — staff login password (8+ characters)

The Discord bot token is never sent to the client.

## Staff login

The public `/login` page is username and password only. It is for staff who edit the website.

1. Set `STAFF_USERNAME` and `STAFF_ACCESS_CODE` in `.env.local` and in Vercel project settings.
2. Open `/login` and sign in.
3. You are sent to `/admin`.

On Vercel, also set `NEXT_PUBLIC_SITE_URL` to the live HTTPS URL and use a long random `SESSION_SECRET`.

The community Discord invite stays on the site. Players apply through Discord, not through a website Discord login.

## Discord bot integration

The website does not invent a second application system. It talks to the existing Rogue RP applications backend:

```text
GET  {APPLICATION_API_URL}/applications
GET  {APPLICATION_API_URL}/applications/:id
GET  {APPLICATION_API_URL}/applications/my
GET  {APPLICATION_API_URL}/whitelist/status?discordId=
POST {APPLICATION_API_URL}/applications/:id/claim
POST {APPLICATION_API_URL}/applications/:id/approve
POST {APPLICATION_API_URL}/applications/:id/deny
POST {APPLICATION_API_URL}/applications/:id/interview
POST {APPLICATION_API_URL}/applications/:id/assign
```

Authenticate with `Authorization: Bearer APPLICATION_API_KEY`.

If those variables are empty, the UI tells players to use Discord instead of showing fake application data.

## FiveM integration

Rogue RP is queried live from `play.rogueroleplay.co.uk:30120`:

- `/players.json`
- `/dynamic.json`

The join button uses `https://cfx.re/join/vqqd59q`. Player counts are not hardcoded. If the city is offline, connect is blocked instead of pretending a join will work.

On Vercel, the status check is an outbound HTTP request to port 30120. If a host blocks that, set a reachable hostname or keep `FIVEM_CONNECT_CODE` so players can still use the cfx.re join link.

## Admin setup

`/admin` requires a successful staff username and password login. A client `isAdmin=true` flag is never trusted.

Role access:

- Owner / Director / Management / Administrator — full staff tools
- Moderator — applications and users
- Development — dashboard and server

## Vercel deployment

```text
GitHub
  ↓
Vercel
  ↓
Rogue RP Website
```

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Set `NEXT_PUBLIC_SITE_URL`, `SESSION_SECRET`, `STAFF_USERNAME` and `STAFF_ACCESS_CODE`.
4. Deploy.
5. Attach the custom domain, for example `roguerp.co.uk`.
6. Test staff login at `/login`.
7. Test `/api/server/status`.
8. Test applications once `APPLICATION_API_URL` is live.

`NEXT_PUBLIC_SITE_URL` must be the real production URL. Do not hardcode the domain in source.

## Production configuration

- Use a long random `SESSION_SECRET`.
- Keep application secrets in Vercel project settings.
- After attaching a database or KV store, swap the repository store in `src/lib/repositories/store.ts`. Local development already persists to `.data/store.json`. Vercel deployments stay serverless and do not write to the filesystem.
- Replace the placeholder Privacy and Terms copy before making legal claims.

## Security

- Encrypted HTTP-only session cookies
- SameSite Lax
- Origin checks on mutating API routes
- Rate limits on login, applications and analytics
- Server-side authorization for every staff action
- Security headers in `next.config.ts` and `src/proxy.ts`
- No bot tokens in `NEXT_PUBLIC_*` variables
- User-facing errors stay generic

## Troubleshooting

**Login returns to `/login?error=staff-invalid`**
Confirm `STAFF_USERNAME` and `STAFF_ACCESS_CODE` on the deployment.

**Admin says staff only**
Sign in at `/login` with the staff username and password.

**Server status is “Offline”**
Confirm `play.rogueroleplay.co.uk:30120` is reachable from the host running the website, and that `FIVEM_CONNECT_CODE` is `vqqd59q`.

**Applications are empty**
Connect `APPLICATION_API_URL` and `APPLICATION_API_KEY`. Until then the site will not invent records.

**Session errors in production**
`SESSION_SECRET` must be at least 32 characters.

## Future integrations

The website is ready to connect later to:

- Rogue RP FiveM Server
- Rogue RP Framework
- Rogue RP MDT
- Rogue RP Police
- Rogue RP Health Service
- Rogue RP Fire & Rescue
- Rogue RP Economy
- Rogue RP Character System

See `src/lib/fivem/integrations.ts`. Do not hard-wire a single framework into the UI.
