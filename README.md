# Hiremantis: AI-Powered Recruitment Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**Hiremantis** is a full-stack, AI-driven recruitment platform built with Next.js 15 App Router, NextAuth v5, and MongoDB. It streamlines the entire hiring funnel, from job posting to AI-conducted technical interviews and automated candidate evaluation, for three distinct roles: **Admin**, **Recruiter**, and **Candidate**.

> Built by [Raghav Gupta](https://www.linkedin.com/in/raghav-gupta-035b4a292/) & [Priyanshu Anand](https://www.linkedin.com/in/priyans11/)

---

## ✨ Highlights

| Feature                | Description                                                                       |
| ---------------------- | --------------------------------------------------------------------------------- |
| 🤖 AI Interviews       | Gemini AI conducts technical, behavioral & project-based interviews               |
| 🎙️ Voice Responses     | Real-time speech recognition + Deepgram TTS for a conversational experience       |
| 📹 Attention Tracking  | Webcam & window-focus monitoring during live interview sessions                   |
| 📊 Auto Evaluation     | Instant scoring on technical skills, communication, problem-solving & culture fit |
| 🌐 Multi-language      | Full i18n support with English and Hindi (extensible)                             |
| 🔒 Role-Based Auth     | Separate flows and dashboards for Admin, Recruiter, and Candidate                 |
| 📁 S3 File Storage     | Secure resume, profile image & audio storage via AWS S3-compatible buckets        |
| ✉️ Email Notifications | Transactional emails via Resend for waitlist, contact, and admin alerts           |

---

## Features

### Authentication & Security

- Role-based authentication with separate login/registration flows per role
- JWT session management (30-day maxAge) via NextAuth v5
- Password hashing with bcrypt (10 rounds)
- Account activation/deactivation controls for admins
- Custom middleware for route-level protection and automatic role-based redirects
- Zod-powered form validation and API schema enforcement

### Registration & Waitlist

- Toggle registration on/off via a single environment variable (`REGISTRATION_ENABLED`)
- Built-in waitlist collection when registration is disabled
- Automated waitlist confirmation & admin notification emails

### Job & Application Management

- Full CRUD for job listings with detailed requirements
- Candidate application submissions with resume upload
- Application status tracking with real-time updates
- Paginated search and filtering

### AI Interview System

1. **Pre-flight Check** — camera and microphone readiness verification
2. **Dynamic Questions** — role-tailored technical, project, and behavioral questions powered by Gemini AI
3. **Multimodal Responses** — text input or live speech recognition
4. **Attention Monitoring** — webcam + tab/window focus tracking throughout the session
5. **Automated Evaluation** — post-interview scoring report with feedback on strengths and improvement areas
6. **Pre-flight Check:** camera and microphone readiness verification
7. **Dynamic Questions:** role-tailored technical, project, and behavioral questions powered by Gemini AI
8. **Multimodal Responses:** text input or live speech recognition
9. **Attention Monitoring:** webcam + tab/window focus tracking throughout the session
10. **Automated Evaluation:** post-interview scoring report with feedback on strengths and improvement areas

### Social Sharing & Discovery

- Share job posts to Facebook, LinkedIn, Telegram, WhatsApp, and Messenger
- Public job board at `/jobs` with SEO-optimised metadata

---

## Tech Stack

### Frontend

- **Next.js 15** (App Router) + **React 19**
- **TypeScript 5**
- **Tailwind CSS v4** + **shadcn/ui** components
- **Framer Motion** for animations
- **TanStack React Query** for server state
- **next-intl** for internationalisation
- **Recharts** for analytics charts

### Backend

- **NextAuth v5 (Auth.js):** authentication & session
- **MongoDB + Mongoose:** persistent data storage
- **AWS S3-compatible storage:** files and audio
- **Server Actions:** type-safe server-side mutations

### AI & Media

- **Google Gemini AI:** interview question generation and evaluation
- **Deepgram:** text-to-speech
- **Web Speech API:** real-time speech recognition

### Tooling

- **Zod:** validation
- **React Hook Form:** form management
- **Resend:** transactional email
- **Husky + commitlint:** commit hygiene
- **ESLint + Prettier:** code quality

---

## Getting Started

### Prerequisites

- Node.js 18+ and [pnpm](https://pnpm.io)
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))
- AWS S3-compatible storage (e.g. [Tigris](https://www.tigrisdata.com))
- [Google Cloud API key](https://ai.google.dev) (Gemini AI)
- [Deepgram API key](https://deepgram.com) (TTS)
- [Resend API key](https://resend.com) (emails)

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
AUTH_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret   # openssl rand -base64 32

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=your_admin_email

# Registration Control
REGISTRATION_ENABLED=true   # set to 'false' to enable waitlist mode

# AWS S3 / Compatible Storage
AWS_ACCESS_KEY_ID=your_key_id
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=auto
AWS_ENDPOINT_URL_S3=https://your-s3-endpoint
AWS_BUCKET_NAME=your_bucket_name

# AI Services
GOOGLE_API_KEY=your_gemini_api_key
DEEPGRAM_API_KEY=your_deepgram_api_key
```

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/priyanshwho/Hiremantis.git
cd Hiremantis

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env.local   # then fill in your values

# 4. Create your first admin user
pnpm tsx scripts/create-admin.ts "Admin Name" "admin@example.com" "password"

# 5. Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Routes

| Path                  | Description                               |
| --------------------- | ----------------------------------------- |
| `/`                   | Landing page                              |
| `/jobs`               | Public job board                          |
| `/login`              | Unified login (redirects by role)         |
| `/login/admin`        | Admin login                               |
| `/login/recruiter`    | Recruiter login                           |
| `/login/candidate`    | Candidate login                           |
| `/register/recruiter` | Recruiter registration                    |
| `/register/candidate` | Candidate registration                    |
| `/dashboard`          | Unified dashboard (role-specific content) |
| `/demo/book`          | Book a live platform demo                 |
| `/learn-more`         | Feature deep-dive                         |
| `/about`              | About the platform                        |

> **Note:** Admin accounts cannot be created through the UI. Use the `create-admin` script above.

---

## Project Structure

```
src/
├── actions/        # Next.js Server Actions (type-safe mutations)
├── app/            # App Router pages & API routes
├── components/     # Reusable UI components (shadcn/ui + custom)
├── constants/      # Application-wide constants
├── hooks/          # Custom React hooks
├── i18n/           # Internationalisation (next-intl)
├── lib/            # Utility functions, DB clients, email templates
├── models/         # Mongoose schemas & models
├── provider/       # Global React providers
└── types/          # TypeScript type definitions
```

---

## Role-Specific Features

### Recruiter

- Create, edit, and manage job listings with rich requirement specs
- Review candidate applications and resumes
- Trigger AI interviews for shortlisted candidates
- View automated interview evaluation reports
- Share job posts across social platforms

### Candidate

- Browse and search the public job board
- Submit applications with resume upload
- Participate in AI-powered video interviews from any device
- Receive automated performance feedback
- Track real-time application status

### Admin

- Full user, job, and application management
- Analytics dashboard with platform-wide metrics
- Waitlist and contact submission management
- System configuration, access control, and user activation

---

## Roadmap

### Completed ✅

- Role-based authentication with full route protection
- Job posting & application lifecycle management
- Resume upload with S3 storage
- AI interview system (Gemini AI + Deepgram TTS)
- Automated post-interview evaluation reports
- Multi-language support (English & Hindi)
- Waitlist system with email notifications

### Planned 🚧

- Mobile app (React Native) for on-the-go interviews
- Calendar integration for interview scheduling
- AI-powered resume parsing
- Video recording & playback of interview sessions
- Full ATS integrations (Greenhouse, Lever, etc.)
- Additional language support
- Advanced analytics and cohort reporting

---

## Contributing

Contributions, bug reports, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit with a conventional message: `git commit -m 'feat: add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License**; see the [LICENSE](./LICENSE) file for details.

---

_Authors:  
[Raghav Gupta](https://www.linkedin.com/in/raghav-gupta-035b4a292/) & [Priyanshu Anand](https://www.linkedin.com/in/priyans11/)_
