# Internal Developer Documentation

Deep-dive implementation details for developers actively working on the Hiremantis codebase.

> For setup and deployment, see the [public docs](../README.md).

---

## Contents

| Document                                          | Description                                                                                               |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [Authentication](./authentication.md)             | NextAuth config, RBAC matrix, JWT callbacks, route protection, session management                         |
| [API Reference](./api-reference.md)               | All 30+ API endpoints with request/response schemas, auth requirements, and error codes                   |
| [AI Interview System](./ai-interview-system.md)   | Interview pipeline, phase state machine, React hooks, TTS/speech integration, evaluation scoring          |
| [Data Models](./data-models.md)                   | All 6 Mongoose schemas, ER diagram, embedded documents (InterviewState), Edge Runtime guard pattern       |
| [Components](./components.md)                     | 100+ components organized by domain, shadcn/ui usage, key patterns (forms, data fetching, RBAC rendering) |
| [Email System](./email-system.md)                 | React Email templates, Resend integration, trigger points, adding new templates                           |
| [Internationalization](./internationalization.md) | next-intl setup, locale config, adding languages, cookie-based persistence, translation usage patterns    |

---

## Quick Links

- [Auth flow sequence diagram](./authentication.md#auth-flow-diagram)
- [API endpoint index](./api-reference.md)
- [Interview phase state machine](./ai-interview-system.md#interview-phases)
- [Data model ER diagram](./data-models.md#entity-relationship-diagram)
- [useInterviewChat hook](./ai-interview-system.md#useinterviewchat-534-lines)
- [Adding a new language](./internationalization.md#adding-a-new-language)
- [Adding an email template](./email-system.md#adding-a-new-email-template)
