# Contributing Guide

This document covers the development workflow, coding standards, commit conventions, and pull request process for Hiremantis.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style & Linting](#code-style--linting)
- [Commit Conventions](#commit-conventions)
- [Branch Strategy](#branch-strategy)
- [Pull Request Process](#pull-request-process)
- [Project Conventions](#project-conventions)
- [Reporting Issues](#reporting-issues)

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **pnpm** (install via `npm install -g pnpm`)
- **Git** with hooks support

### Setup

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/Hiremantis.git
cd Hiremantis

# 3. Add upstream remote
git remote add upstream https://github.com/priyanshwho/Hiremantis.git

# 4. Install dependencies (also sets up Husky hooks)
pnpm install

# 5. Create environment file
cp .env.example .env.local
# Edit .env.local with your credentials

# 6. Start development server
pnpm dev
```

---

## Development Workflow

### Day-to-Day

1. **Pull latest** from upstream `main`
2. **Create a feature branch** from `main`
3. **Make incremental changes** and test locally
4. **Commit often** with conventional messages
5. **Push** to your fork
6. **Open a Pull Request** against `upstream/main`

### Running the App

```bash
# Development (with Turbopack HMR)
pnpm dev

# Production build + start
pnpm build
pnpm start
```

### Useful Commands

| Command                            | Description                     |
| ---------------------------------- | ------------------------------- |
| `pnpm dev`                         | Start dev server with Turbopack |
| `pnpm build`                       | Production build                |
| `pnpm lint`                        | Run ESLint                      |
| `pnpm lint:fix`                    | Auto-fix lint issues            |
| `pnpm format`                      | Format with Prettier            |
| `pnpm format:check`                | Check formatting                |
| `pnpm tsx scripts/verify-setup.ts` | Validate environment            |

---

## Code Style & Linting

### ESLint

The project uses ESLint with the following plugins:

| Plugin                             | Purpose                                               |
| ---------------------------------- | ----------------------------------------------------- |
| `eslint-config-next`               | Next.js-specific rules                                |
| `eslint-config-prettier`           | Disables formatting rules that conflict with Prettier |
| `eslint-plugin-prettier`           | Runs Prettier as an ESLint rule                       |
| `eslint-plugin-simple-import-sort` | Auto-sorts imports                                    |
| `eslint-plugin-unused-imports`     | Removes unused imports                                |

Configuration: `eslint.config.mjs`

### Prettier

Code formatting with Prettier. Configuration is in the project root.

### lint-staged

Pre-commit hook runs lint-staged on changed files:

- Lints and formats only staged files
- Prevents committing code that doesn't pass checks

### TypeScript

- **Strict mode** enabled
- All files must be `.ts` or `.tsx`
- Path aliases: `@/` maps to `src/`
- Type definitions in `src/types/`

---

## Commit Conventions

The project enforces **Conventional Commits** via Husky + commitlint.

### Format

```
type(scope?): description

[optional body]
[optional footer]
```

### Types

| Type       | Description                              |
| ---------- | ---------------------------------------- |
| `feat`     | A new feature                            |
| `fix`      | A bug fix                                |
| `docs`     | Documentation changes                    |
| `style`    | Code style (formatting, no logic change) |
| `refactor` | Code refactoring (no feature/fix)        |
| `perf`     | Performance improvement                  |
| `test`     | Adding or updating tests                 |
| `build`    | Build system or dependency changes       |
| `ci`       | CI/CD configuration                      |
| `chore`    | Maintenance tasks                        |
| `revert`   | Reverts a previous commit                |

### Examples

```bash
# Feature
git commit -m "feat: add AI resume parsing"
git commit -m "feat(interview): add auto-send timer"

# Fix
git commit -m "fix: resolve session timeout on interview page"
git commit -m "fix(auth): handle disabled account redirect"

# Docs
git commit -m "docs: add deployment guide"

# Refactor
git commit -m "refactor(hooks): extract audio playback logic"
```

### What Happens on Commit

```
git commit
  → Husky triggers pre-commit hook
  → lint-staged runs on staged files
  → commitlint validates commit message format
  → If all pass → commit succeeds
  → If any fail → commit is rejected with error details
```

Configuration: `commitlint.config.js`

---

## Branch Strategy

### Branch Naming

```
feature/description     # New features
fix/description         # Bug fixes
docs/description        # Documentation
refactor/description    # Code refactoring
```

Examples:

```
feature/calendar-integration
fix/interview-timer-overflow
docs/api-reference
refactor/auth-middleware
```

### Branch Rules

- `main` is the production branch — always deployable
- Feature branches are created from `main`
- Merge via Pull Requests only (no direct pushes to `main`)
- Keep branches short-lived and focused

---

## Pull Request Process

### Before Opening a PR

1. **Rebase** on latest `main`:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run checks locally**:

   ```bash
   pnpm lint
   pnpm format:check
   pnpm build
   ```

3. **Test your changes** — verify the feature/fix works as expected

### PR Template

When opening a PR, include:

- **Title**: Follow conventional commit format (e.g., `feat: add calendar integration`)
- **Description**: What changed and why
- **Screenshots**: For UI changes
- **Testing**: How you verified the changes
- **Related Issues**: Link any related GitHub issues

### Review Process

1. PR is reviewed by a maintainer
2. Feedback is addressed with additional commits
3. Once approved, PR is merged (squash or rebase)
4. Feature branch is deleted

---

## Project Conventions

### File Organization

| Convention                                 | Example                          |
| ------------------------------------------ | -------------------------------- |
| Components use PascalCase                  | `InterviewClient.tsx`            |
| Hooks use `use-` prefix (kebab-case files) | `use-interview-chat.tsx`         |
| API routes use lowercase folders           | `api/ai/interview/chat/route.ts` |
| Models use lowercase (singular)            | `models/user.ts`                 |
| Lib utilities use kebab-case               | `lib/ai-utils.ts`                |

### Import Order

Enforced by `eslint-plugin-simple-import-sort`:

1. External packages (`react`, `next`, etc.)
2. Internal aliases (`@/components`, `@/lib`, etc.)
3. Relative imports (`./`, `../`)
4. Style imports

### Component Patterns

- Use `'use client'` directive only when needed (hooks, browser APIs, interactivity)
- Prefer Server Components for data-fetching pages
- Colocate component-specific types within the component file
- Extract reusable logic into custom hooks (`src/hooks/`)

### API Route Patterns

- Validate all inputs with Zod
- Check authentication via `auth()` from NextAuth
- Return consistent error shapes: `{ error: "message" }`
- Use appropriate HTTP status codes

---

## Reporting Issues

### Bug Reports

Open a [GitHub Issue](https://github.com/priyanshwho/Hiremantis/issues) with:

- **Title**: Clear, concise description
- **Steps to reproduce**: Exact steps to trigger the bug
- **Expected behavior**: What should happen
- **Actual behavior**: What happens instead
- **Environment**: Browser, OS, Node.js version
- **Screenshots/logs**: If applicable

### Feature Requests

Open a [GitHub Issue](https://github.com/priyanshwho/Hiremantis/issues) with:

- **Title**: `[Feature Request] Description`
- **Problem**: What problem does this solve?
- **Proposed solution**: How you envision it working
- **Alternatives**: Any alternatives you've considered

---

## Questions?

- Open a [GitHub Discussion](https://github.com/priyanshwho/Hiremantis/discussions)
- Or reach out to the maintainers via LinkedIn
