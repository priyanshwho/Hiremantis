# Deployment Guide

This document covers environment configuration, production deployment, and infrastructure setup for Hiremantis.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Infrastructure Services](#infrastructure-services)
- [Verification Scripts](#verification-scripts)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Requirement           | Version       | Purpose                           |
| --------------------- | ------------- | --------------------------------- |
| Node.js               | 18+           | Runtime                           |
| pnpm                  | Latest        | Package manager                   |
| MongoDB               | 6+ (or Atlas) | Database                          |
| S3-compatible storage | —             | File storage (Tigris recommended) |
| Google Cloud API key  | —             | Gemini AI access                  |
| Deepgram API key      | —             | Text-to-speech                    |
| Resend API key        | —             | Transactional email               |

---

## Environment Variables

Create a `.env.local` file in the project root. All variables are documented below.

### Required Variables

| Variable          | Example                                                  | Description                           |
| ----------------- | -------------------------------------------------------- | ------------------------------------- |
| `MONGODB_URI`     | `mongodb+srv://user:pass@cluster.mongodb.net/hiremantis` | MongoDB connection string             |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32`                                | JWT signing secret (random 32+ chars) |
| `NEXTAUTH_URL`    | `http://localhost:3000`                                  | Full application URL                  |
| `AUTH_URL`        | `http://localhost:3000`                                  | Auth.js URL (same as NEXTAUTH_URL)    |

### Email (Resend)

| Variable         | Example             | Description                            |
| ---------------- | ------------------- | -------------------------------------- |
| `RESEND_API_KEY` | `re_xxxxx`          | Resend API key for transactional email |
| `ADMIN_EMAIL`    | `admin@example.com` | Admin notification recipient           |

### Storage (S3-Compatible)

| Variable                | Example                          | Description                       |
| ----------------------- | -------------------------------- | --------------------------------- |
| `AWS_ACCESS_KEY_ID`     | `tid_xxxxx`                      | S3 access key ID                  |
| `AWS_SECRET_ACCESS_KEY` | `tsec_xxxxx`                     | S3 secret access key              |
| `AWS_REGION`            | `auto`                           | S3 region (use `auto` for Tigris) |
| `AWS_ENDPOINT_URL_S3`   | `https://fly.storage.tigris.dev` | S3 endpoint URL                   |
| `AWS_BUCKET_NAME`       | `hiremantis`                     | S3 bucket name                    |

### AI Services

| Variable           | Example     | Description              |
| ------------------ | ----------- | ------------------------ |
| `GOOGLE_API_KEY`   | `AIzaSy...` | Google Gemini AI API key |
| `DEEPGRAM_API_KEY` | `xxxxx`     | Deepgram TTS API key     |

### Application Config

| Variable               | Example | Default | Description                                         |
| ---------------------- | ------- | ------- | --------------------------------------------------- |
| `REGISTRATION_ENABLED` | `true`  | `true`  | Enable/disable registration (false = waitlist mode) |

### Analytics (Optional)

| Variable                   | Example                    | Description                  |
| -------------------------- | -------------------------- | ---------------------------- |
| `NEXT_PUBLIC_POSTHOG_KEY`  | `phc_xxxxx`                | PostHog project API key      |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://us.i.posthog.com` | PostHog host URL             |
| `NEXT_PUBLIC_CLARITY_ID`   | `xxxxx`                    | Microsoft Clarity project ID |

### Complete `.env.local` Template

```bash
# ── Required ─────────────────────────────────────────────
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
AUTH_URL=http://localhost:3000

# ── Email (Resend) ───────────────────────────────────────
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=your_admin_email

# ── Registration ─────────────────────────────────────────
REGISTRATION_ENABLED=true

# ── Storage (S3-Compatible / Tigris) ─────────────────────
AWS_ACCESS_KEY_ID=your_key_id
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=auto
AWS_ENDPOINT_URL_S3=https://your-s3-endpoint
AWS_BUCKET_NAME=your_bucket_name

# ── AI Services ──────────────────────────────────────────
GOOGLE_API_KEY=your_gemini_api_key
DEEPGRAM_API_KEY=your_deepgram_api_key

# ── Analytics (Optional) ─────────────────────────────────
# NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
# NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
# NEXT_PUBLIC_CLARITY_ID=your_clarity_id
```

---

## Local Development

### Initial Setup

```bash
# 1. Clone the repository
git clone https://github.com/priyanshwho/Hiremantis.git
cd Hiremantis

# 2. Install dependencies
pnpm install

# 3. Create environment file
cp .env.example .env.local
# Edit .env.local with your values

# 4. Verify setup
pnpm tsx scripts/verify-setup.ts

# 5. Create admin user
pnpm tsx scripts/create-admin.ts "Admin Name" "admin@example.com" "password"

# 6. Start development server (with Turbopack)
pnpm dev
```

### Available Scripts

| Script       | Command             | Description                         |
| ------------ | ------------------- | ----------------------------------- |
| Dev          | `pnpm dev`          | Start dev server with Turbopack HMR |
| Build        | `pnpm build`        | Create production build             |
| Start        | `pnpm start`        | Start production server             |
| Lint         | `pnpm lint`         | Run ESLint checks                   |
| Lint Fix     | `pnpm lint:fix`     | Auto-fix lint issues                |
| Format       | `pnpm format`       | Format all files with Prettier      |
| Format Check | `pnpm format:check` | Check formatting                    |

### Development Notes

- The dev server uses **Turbopack** for fast HMR
- MongoDB connection is cached and reused across hot reloads
- PostHog events are proxied through Next.js rewrites to avoid ad-blockers
- Husky git hooks enforce conventional commits on every commit

---

## Production Deployment

### Vercel (Recommended)

Hiremantis is designed for Vercel deployment:

1. **Connect repository** to Vercel
2. **Set environment variables** in Vercel dashboard (all from `.env.local`)
3. **Set `NEXTAUTH_URL` and `AUTH_URL`** to your production domain
4. **Deploy** — Vercel auto-detects Next.js and configures the build

Important Vercel settings:

- **Framework**: Next.js (auto-detected)
- **Build command**: `pnpm build`
- **Output directory**: `.next` (default)
- **Node.js version**: 18+

### Self-Hosted

For self-hosted deployments:

```bash
# Build
pnpm build

# Start (with PM2 or similar)
pnpm start

# Or with PM2
pm2 start npm --name "hiremantis" -- start
```

Ensure:

- All environment variables are set in the shell or `.env.local`
- MongoDB is accessible from the server
- S3 storage endpoint is reachable
- Ports are properly configured (default: 3000)

### Docker (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
```

---

## Infrastructure Services

### MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user with read/write permissions
3. Whitelist your IP (or `0.0.0.0/0` for Vercel)
4. Copy the connection string to `MONGODB_URI`

### Tigris S3 Storage

1. Sign up at [tigrisdata.com](https://www.tigrisdata.com)
2. Create a bucket
3. Generate access keys
4. Set the endpoint, keys, and bucket name in environment variables
5. The S3 client uses path-style access (configured in `src/lib/s3-client.ts`)

### Google Gemini AI

1. Get an API key from [ai.google.dev](https://ai.google.dev)
2. The project uses `gemini-2.0-flash` (configured in `src/lib/ai-utils.ts`)
3. Set the key as `GOOGLE_API_KEY`

### Deepgram

1. Sign up at [deepgram.com](https://deepgram.com)
2. Create an API key with text-to-speech permissions
3. The project uses the `aura-2-thalia-en` voice model
4. Set the key as `DEEPGRAM_API_KEY`

### Resend

1. Sign up at [resend.com](https://resend.com)
2. Verify your sending domain
3. Create an API key
4. Set `RESEND_API_KEY` and `ADMIN_EMAIL`

### PostHog (Optional)

1. Sign up at [posthog.com](https://posthog.com)
2. Create a project and get the API key
3. Set `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`
4. Events are proxied through Next.js rewrites (see `next.config.ts`)

### Microsoft Clarity (Optional)

1. Sign up at [clarity.microsoft.com](https://clarity.microsoft.com)
2. Create a project and get the ID
3. Set `NEXT_PUBLIC_CLARITY_ID`

---

## Verification Scripts

### `scripts/verify-setup.ts`

Validates environment configuration before first run:

```bash
pnpm tsx scripts/verify-setup.ts
```

Checks 14 environment variables:

- **4 required** (MONGODB_URI, NEXTAUTH_SECRET, NEXTAUTH_URL, AUTH_URL) — fail if missing
- **10 optional** (AWS, Gemini, Deepgram, Resend, etc.) — warn if missing

### `scripts/test-gemini-api.ts`

Tests Gemini AI connectivity:

```bash
pnpm tsx scripts/test-gemini-api.ts
```

- Lists available models
- Tests text generation with multiple model variants
- Reports success/failure for each

### `scripts/create-admin.ts`

Creates admin user accounts:

```bash
pnpm tsx scripts/create-admin.ts "Name" "email@example.com" "password"
```

- Connects to MongoDB
- Hashes password with bcrypt
- Creates user with `role: "admin"` and `isActive: true`

---

## Troubleshooting

### MongoDB Connection Issues

- Ensure `MONGODB_URI` includes the database name
- Check IP whitelist on Atlas (add `0.0.0.0/0` for serverless)
- Verify the user has `readWrite` permissions

### S3 Upload Failures

- Verify endpoint URL is correct (include `https://`)
- Check bucket exists and keys have write permissions
- For Tigris, ensure `forcePathStyle: true` is set (already configured)

### Gemini API Errors

- Check API key validity and quota at [console.cloud.google.com](https://console.cloud.google.com)
- The app handles quota errors gracefully with retry messaging
- Run `scripts/test-gemini-api.ts` to diagnose connectivity

### Auth Issues

- Ensure `NEXTAUTH_SECRET` is the same across deployments
- `AUTH_URL` and `NEXTAUTH_URL` must match the actual domain
- Clear browser cookies if session state is corrupted

### Build Failures

- Run `pnpm lint` to check for code issues
- Ensure all required environment variables are set at build time
- Check Node.js version is 18+
