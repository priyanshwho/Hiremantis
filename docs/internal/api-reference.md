# API Reference

This document covers all API routes in Hiremantis, organized by domain. All API routes live under `src/app/api/`.

## Table of Contents

- [Authentication](#authentication)
- [Jobs](#jobs)
- [Applications](#applications)
- [AI & Interview](#ai--interview)
- [Admin](#admin)
- [Files & Upload](#files--upload)
- [Dashboard](#dashboard)
- [Contact](#contact)
- [Wishlist](#wishlist)
- [Common Patterns](#common-patterns)

---

## Authentication

### `POST /api/auth/login`

Internal login endpoint called by NextAuth's Credentials provider.

| Field      | Type                                  | Required | Description   |
| ---------- | ------------------------------------- | -------- | ------------- |
| `email`    | string                                | ✅       | User email    |
| `password` | string                                | ✅       | User password |
| `role`     | `admin` \| `recruiter` \| `candidate` | ✅       | Expected role |

**Response**: `{ id, name, email, role, isActive }` or `401/404` error.

**Logic**: Finds user by email → verifies role matches → bcrypt password comparison.

---

### `POST /api/register`

Register a new recruiter or candidate account.

| Field      | Type                       | Required | Description            |
| ---------- | -------------------------- | -------- | ---------------------- |
| `name`     | string                     | ✅       | Full name              |
| `email`    | string                     | ✅       | Email address          |
| `password` | string                     | ✅       | Password (min 6 chars) |
| `role`     | `recruiter` \| `candidate` | ✅       | Account role           |

**Response**: `201 Created` with user data or `400/409` error.

**Note**: Returns `403` when `REGISTRATION_ENABLED=false`.

---

### `GET/POST /api/auth/[...nextauth]`

NextAuth catch-all handler. Manages session, CSRF, sign-in, sign-out, and callback endpoints automatically.

---

## Jobs

### `POST /api/jobs`

Create a new job listing. **Auth**: Recruiter or Admin.

| Field               | Type     | Required | Description                 |
| ------------------- | -------- | -------- | --------------------------- |
| `title`             | string   | ✅       | Job title                   |
| `description`       | string   | ✅       | Full description            |
| `companyName`       | string   | ✅       | Company name                |
| `location`          | string   | ✅       | Job location                |
| `salary`            | string   | ❌       | Salary range                |
| `skills`            | string[] | ✅       | Required skills             |
| `requirements`      | string   | ❌       | Additional requirements     |
| `benefits`          | string   | ❌       | Job benefits                |
| `expiryDate`        | Date     | ❌       | Listing expiry              |
| `interviewDuration` | number   | ❌       | Duration in minutes (5–120) |

**Response**: `201 Created` with job object.

---

### `GET /api/jobs/list`

Public job listing. **Auth**: None (public).

| Query Param | Type   | Description                           |
| ----------- | ------ | ------------------------------------- |
| `page`      | number | Page number (default: 1)              |
| `limit`     | number | Items per page (default: 10)          |
| `search`    | string | Search in title, description, company |
| `location`  | string | Filter by location                    |
| `skills`    | string | Comma-separated skill filter          |

**Response**: `{ jobs, total, page, totalPages }`.

---

### `GET /api/jobs/[id]`

Get a single job by ID or URL slug. **Auth**: Public for GET.

**Response**: Full job object with recruiter name.

---

### `PUT /api/jobs/[id]`

Update a job listing. **Auth**: Owner recruiter or Admin.

**Body**: Same fields as POST (partial update supported).

---

### `DELETE /api/jobs/[id]`

Delete a job listing. **Auth**: Owner recruiter or Admin.

---

### `GET /api/jobs/recruiter/list`

List jobs created by the authenticated recruiter. **Auth**: Recruiter or Admin.

| Query Param | Type   | Description    |
| ----------- | ------ | -------------- |
| `page`      | number | Page number    |
| `limit`     | number | Items per page |

---

## Applications

### `POST /api/applications`

Submit a job application. **Auth**: Candidate or Admin.

| Field               | Type   | Required | Description                  |
| ------------------- | ------ | -------- | ---------------------------- |
| `jobId`             | string | ✅       | Job ObjectId                 |
| `resumeUrl`         | string | ✅       | S3 URL of uploaded resume    |
| `s3Key`             | string | ✅       | S3 object key                |
| `s3Bucket`          | string | ✅       | S3 bucket name               |
| `fileName`          | string | ✅       | Original file name           |
| `preferredLanguage` | string | ❌       | Preferred interview language |

**Response**: `201 Created` with application ID.

---

### `GET /api/applications/[id]`

Get a single application with full details. **Auth**: Owner candidate, job's recruiter, or Admin.

**Response**: Application object with populated job and user data.

---

### `PUT /api/applications/[id]`

Update an application. **Auth**: Recruiter (of the job) or Admin.

---

### `PATCH /api/applications/[id]/status`

Update application status. **Auth**: Recruiter or Admin.

| Field    | Type                                                | Description |
| -------- | --------------------------------------------------- | ----------- |
| `status` | `pending` \| `reviewed` \| `accepted` \| `rejected` | New status  |

---

### `POST /api/applications/[id]/analyze`

Trigger AI resume analysis for an application. **Auth**: Recruiter or Admin.

**Response**: Parsed resume data including:

- Extracted text, skills, experience, education
- AI match score (0–100)
- AI comments and recommendations

---

### `GET /api/applications/recruiter`

List applications for the authenticated recruiter's jobs.

| Query Param | Type   | Description            |
| ----------- | ------ | ---------------------- |
| `page`      | number | Page number            |
| `limit`     | number | Items per page         |
| `status`    | string | Filter by status       |
| `jobId`     | string | Filter by specific job |

---

### `GET /api/applications/[id]/monitoring`

Get monitoring configuration for an application's interview.

---

### `GET /api/applications/[id]/monitoring-image/[key]`

Retrieve a specific monitoring (proctoring) image by its S3 key.

---

## AI & Interview

All AI interview endpoints are under `/api/ai/interview/`. **Auth**: Candidate or Admin.

### `POST /api/ai/interview/init`

Initialize an interview session.

| Field           | Type   | Required | Description          |
| --------------- | ------ | -------- | -------------------- |
| `applicationId` | string | ✅       | Application ObjectId |

**Response**: `{ messages, interviewState }` — initial system context and any existing chat history.

**Logic**:

1. Loads job details and parsed resume
2. Constructs system prompt with role context
3. If resuming, loads existing chat history
4. Sets interview phase to `introduction` if new

---

### `POST /api/ai/interview/chat`

Send a message during an active interview.

| Field                 | Type   | Required | Description               |
| --------------------- | ------ | -------- | ------------------------- |
| `applicationId`       | string | ✅       | Application ObjectId      |
| `message`             | string | ✅       | User's message text       |
| `conversationHistory` | array  | ✅       | Full conversation context |

**Response**: `{ response, audioUrl?, interviewState }` — AI response text, optional TTS audio URL, updated state.

**Logic**:

1. Validates interview is active (not completed/interrupted)
2. Sends conversation to Gemini AI with system prompt
3. Updates question counts per category
4. Generates TTS audio via Deepgram
5. Saves message pair to chat history
6. Advances interview phase when question quotas are met

---

### `GET /api/ai/interview/state`

Get current interview state.

| Query Param     | Type   | Description          |
| --------------- | ------ | -------------------- |
| `applicationId` | string | Application ObjectId |

**Response**: `{ interviewState }` — current phase, question counts, feedback (if completed).

---

### `GET /api/ai/interview/history`

Retrieve full chat history for an interview session.

| Query Param     | Type   | Description          |
| --------------- | ------ | -------------------- |
| `applicationId` | string | Application ObjectId |

**Response**: `{ messages }` — array of `{ role, content, timestamp }`.

---

### `POST /api/ai/interview/evaluate`

Manually trigger evaluation for a completed interview.

| Field           | Type   | Required | Description          |
| --------------- | ------ | -------- | -------------------- |
| `applicationId` | string | ✅       | Application ObjectId |

**Response**: Evaluation scores and feedback.

---

### `POST /api/ai/interview/autoevaluate`

Automatically evaluate when an interview completes (called internally).

| Field           | Type   | Description          |
| --------------- | ------ | -------------------- |
| `applicationId` | string | Application ObjectId |

---

### `POST /api/ai/interview/interrupt`

Force-end an interview session.

| Field           | Type   | Required | Description                                  |
| --------------- | ------ | -------- | -------------------------------------------- |
| `applicationId` | string | ✅       | Application ObjectId                         |
| `reason`        | string | ❌       | Interruption reason (timer, technical, user) |

---

### `POST /api/ai/generate-job-description`

Generate an AI-powered job description. **Auth**: Recruiter or Admin.

| Field               | Type     | Required | Description   |
| ------------------- | -------- | -------- | ------------- |
| `title`             | string   | ✅       | Job title     |
| `skills`            | string[] | ❌       | Key skills    |
| `additionalContext` | string   | ❌       | Extra context |

**Response**: `{ description }` — AI-generated job description text.

---

## Admin

### `GET /api/admin/users`

List all users with filtering. **Auth**: Admin only.

| Query Param | Type   | Description          |
| ----------- | ------ | -------------------- |
| `role`      | string | Filter by role       |
| `search`    | string | Search by name/email |
| `page`      | number | Page number          |
| `limit`     | number | Items per page       |

---

### `GET /api/admin/users/[id]`

Get a specific user's details. **Auth**: Admin only.

---

### `PUT /api/admin/users/[id]`

Update a user (activate/deactivate, change role, etc.). **Auth**: Admin only.

---

### `DELETE /api/admin/users/[id]`

Delete a user account. **Auth**: Admin only.

---

### `GET /api/admin/jobs`

List all jobs across all recruiters. **Auth**: Admin only.

---

## Files & Upload

### `POST /api/upload`

Upload a file (resume, image) to S3.

**Body**: `multipart/form-data` with file field.

**Response**: `{ url, key, bucket }` — S3 URL and metadata.

---

### `GET /api/files/get-signed-url`

Generate a presigned S3 URL for secure file access.

| Query Param | Type   | Description    |
| ----------- | ------ | -------------- |
| `key`       | string | S3 object key  |
| `bucket`    | string | S3 bucket name |

**Response**: `{ url }` — time-limited presigned URL.

---

## Dashboard

### `GET /api/dashboard/stats`

Fetch dashboard statistics based on user role. **Auth**: Any authenticated user.

**Response varies by role**:

- **Admin**: total users, jobs, applications, recent activity
- **Recruiter**: own jobs count, applications received, interview stats
- **Candidate**: applications submitted, interviews completed, pending status

---

## Contact

### `POST /api/contact`

Submit a contact form. **Auth**: None (public).

| Field     | Type   | Required | Description  |
| --------- | ------ | -------- | ------------ |
| `name`    | string | ✅       | Sender name  |
| `email`   | string | ✅       | Sender email |
| `message` | string | ✅       | Message body |

**Side effects**: Sends confirmation email to user + notification to admin.

---

### `GET /api/contact/[id]`

Get a specific contact submission. **Auth**: Admin only.

---

### `PUT /api/contact/[id]`

Mark a contact submission as resolved. **Auth**: Admin only.

---

## Wishlist

### `POST /api/wishlist`

Submit a waitlist entry. **Auth**: None (public).

| Field    | Type   | Required | Description            |
| -------- | ------ | -------- | ---------------------- |
| `name`   | string | ✅       | Name                   |
| `email`  | string | ✅       | Email                  |
| `reason` | string | ❌       | Why they're interested |

**Side effects**: Sends confirmation email to user + notification to admin.

---

## Common Patterns

### Authentication Check

All protected routes follow this pattern:

```
1. Get session via auth()
2. If no session → 401 Unauthorized
3. If wrong role → 403 Forbidden
4. Proceed with business logic
```

### Error Responses

| Status | Meaning                        |
| ------ | ------------------------------ |
| `400`  | Bad request / validation error |
| `401`  | Not authenticated              |
| `403`  | Insufficient permissions       |
| `404`  | Resource not found             |
| `409`  | Conflict (duplicate)           |
| `500`  | Internal server error          |

All errors return `{ error: "descriptive message" }`.

### Validation

Request bodies are validated with Zod schemas before processing. Invalid requests receive a `400` with details on what failed.

### Pagination

Paginated endpoints accept `page` (1-based) and `limit` query parameters and return:

```json
{
  "data": [...],
  "total": 42,
  "page": 1,
  "totalPages": 5
}
```
