# Hiremantis Documentation

Documentation is split into two sections:

- **[Public Docs](#public-docs)** — for anyone setting up, deploying, or contributing to the project
- **[Internal Docs](./internal/README.md)** — deep-dive implementation details for developers working on the codebase

---

## Public Docs

| Document                          | Description                                                                       |
| --------------------------------- | --------------------------------------------------------------------------------- |
| [Architecture](./architecture.md) | System overview, tech stack, folder structure, request flow, design decisions     |
| [Deployment](./deployment.md)     | Environment variables, local setup, Vercel/self-hosted deployment, infra services |
| [Contributing](./contributing.md) | Dev workflow, commit conventions, branch strategy, PR process, code style         |

---

## Internal Docs

| Document                                                   | Description                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| [Authentication](./internal/authentication.md)             | Auth flow, RBAC implementation, JWT session, route protection matrix    |
| [API Reference](./internal/api-reference.md)               | All 30+ endpoints — request/response schemas, auth requirements         |
| [AI Interview System](./internal/ai-interview-system.md)   | Interview pipeline, phases, hooks, TTS, speech recognition, evaluation  |
| [Data Models](./internal/data-models.md)                   | Mongoose schemas, ER diagram, field reference, embedded documents       |
| [Components](./internal/components.md)                     | Component library overview, directory structure, key patterns           |
| [Email System](./internal/email-system.md)                 | Transactional email templates, Resend integration, adding new templates |
| [Internationalization](./internal/internationalization.md) | i18n setup, locale config, adding languages, translation workflow       |

→ See [docs/internal/README.md](./internal/README.md) for details.

---

## Quick Reference

### Scripts

| Command                               | Description                  |
| ------------------------------------- | ---------------------------- |
| `pnpm dev`                            | Start dev server (Turbopack) |
| `pnpm build`                          | Production build             |
| `pnpm lint`                           | Run ESLint                   |
| `pnpm format`                         | Format with Prettier         |
| `pnpm tsx scripts/create-admin.ts`    | Create an admin user         |
| `pnpm tsx scripts/verify-setup.ts`    | Validate environment config  |
| `pnpm tsx scripts/test-gemini-api.ts` | Test Gemini AI connectivity  |

### Key Paths

| Path                        | Purpose                                   |
| --------------------------- | ----------------------------------------- |
| `src/app/api/`              | All API routes (30+)                      |
| `src/app/dashboard/`        | Role-segmented dashboard pages            |
| `src/components/interview/` | 23 AI interview UI components             |
| `src/hooks/`                | Custom React hooks (incl. interview chat) |
| `src/lib/`                  | DB clients, AI utils, email, S3           |
| `src/models/`               | Mongoose models (6 total)                 |
| `src/i18n/lang/`            | Translation JSON files                    |
