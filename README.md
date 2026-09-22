# cloudbridge

A web app for bridging multiple cloud storage accounts in one place. Connect Google Drive, Dropbox, and OneDrive to view and manage files across providers without switching tabs.

## Features

- **Multi-provider auth** — connect Google Drive, Dropbox, and OneDrive via OAuth
- **Unified bridge view** — access files across all connected accounts from a single interface
- **Session management** — persistent auth sessions via better-auth
- **Dark/light theme toggle**

## Stack

| Layer    | Tech                        |
|----------|-----------------------------|
| Frontend | React 19 + TanStack Router  |
| Server   | TanStack Start (SSR)        |
| Styling  | Tailwind CSS + shadcn/ui    |
| Database | PostgreSQL via Drizzle ORM  |
| Auth     | better-auth                 |
| Deploy   | Docker                      |

## Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL

## Setup

```bash
pnpm install

# Configure env (DATABASE_URL + OAuth credentials for each provider)
cp .env.example .env

# Push DB schema
pnpm db:push

pnpm dev
```

## Environment variables

| Variable                    | Description                            |
|-----------------------------|----------------------------------------|
| `DATABASE_URL`              | PostgreSQL connection string           |
| `GOOGLE_CLIENT_ID`          | Google OAuth client ID                 |
| `GOOGLE_CLIENT_SECRET`      | Google OAuth client secret             |
| `DROPBOX_CLIENT_ID`         | Dropbox OAuth app key                  |
| `DROPBOX_CLIENT_SECRET`     | Dropbox OAuth app secret               |
| `ONEDRIVE_CLIENT_ID`        | Microsoft OAuth client ID              |
| `ONEDRIVE_CLIENT_SECRET`    | Microsoft OAuth client secret          |
| `BETTER_AUTH_SECRET`        | Random secret for session signing      |

## Building

```bash
pnpm build
pnpm start
```