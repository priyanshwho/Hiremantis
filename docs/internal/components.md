# Components

This document provides an overview of the component library organization, key patterns, and notable components in Hiremantis.

## Table of Contents

- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [UI Components (shadcn/ui)](#ui-components-shadcnui)
- [Interview Components](#interview-components)
- [Job Components](#job-components)
- [Dashboard Components](#dashboard-components)
- [Auth Components](#auth-components)
- [Application Components](#application-components)
- [Layout Components](#layout-components)
- [Key Patterns](#key-patterns)

---

## Overview

Hiremantis has **100+ components** organized by domain. The component library is built on:

- **shadcn/ui** (Radix primitives + Tailwind CSS) for base components
- **Custom components** for domain-specific UI (interviews, jobs, dashboard)
- **Framer Motion** for animations
- **React Hook Form + Zod** for form components

Components configuration is defined in `components.json` at the project root.

---

## Directory Structure

```
src/components/
├── ui/                     # 53+ shadcn/ui primitives
├── interview/              # 23 interview UI components
├── jobs/                   # 11 job-related components
├── dashboard/              # 9 role-specific dashboard components
├── auth/                   # 4 authentication components
├── applications/           # 3 application components
├── admin/                  # 2 admin components
├── job-applications/       # 1 job application filter
├── app-sidebar.tsx          # Navigation sidebar
├── site-header.tsx          # Site header with breadcrumbs
├── nav-main.tsx             # Main navigation menu
├── nav-user.tsx             # User profile dropdown
├── theme-toggle.tsx         # Dark/light mode toggle
├── language-selector.tsx    # i18n language picker
├── locale-switcher-select.tsx # Alternate locale switcher
├── data-table.tsx           # Generic data table wrapper
├── floating-controls.tsx    # Floating action controls
├── share-example.tsx        # Social share example
├── section-cards.tsx        # Section card layouts
└── chart-area-interactive.tsx # Interactive area charts
```

---

## UI Components (shadcn/ui)

53+ accessible, customizable primitives in `src/components/ui/`. These are generated via the shadcn/ui CLI and customized with Tailwind CSS.

### Available Components

| Category         | Components                                                                                                           |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Layout**       | Sidebar, Separator, Scroll Area, Resizable Panels, Aspect Ratio, Collapsible                                         |
| **Navigation**   | Navigation Menu, Menubar, Tabs, Breadcrumb                                                                           |
| **Data Display** | Table, Card, Avatar, Badge, Progress, Hover Card                                                                     |
| **Feedback**     | Alert, Alert Dialog, Dialog, Drawer, Sheet, Sonner (Toast), Tooltip                                                  |
| **Forms**        | Button, Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider, Toggle, Toggle Group, Label, Form, Input OTP |
| **Overlay**      | Dropdown Menu, Context Menu, Popover, Command (cmdk)                                                                 |
| **Charts**       | Chart (Recharts wrapper)                                                                                             |
| **Utilities**    | Skeleton, Calendar, Accordion, Carousel                                                                              |

### Usage Pattern

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
```

---

## Interview Components

23 components in `src/components/interview/` powering the AI interview experience.

### Session Components

| Component                     | Description                                                     |
| ----------------------------- | --------------------------------------------------------------- |
| `interview-client.tsx`        | Main interview page wrapper, manages initialization and routing |
| `interview-session.tsx`       | Active interview layout with chat area, controls, and AI avatar |
| `ai-interviewer-icon.tsx`     | Animated AI avatar with idle/thinking/speaking states           |
| `ai-interview-background.tsx` | Themed background pattern for interview UI                      |

### Audio & Speech

| Component                      | Description                                   |
| ------------------------------ | --------------------------------------------- |
| `speech-recognition-input.tsx` | Speech-to-text input with start/stop controls |
| `speech-visualizer.tsx`        | Real-time audio waveform visualization        |
| `voice-indicator.tsx`          | Microphone active/inactive indicator          |
| `audio-player.tsx`             | TTS audio playback with controls              |
| `audio-cleanup.tsx`            | Blob URL lifecycle and cleanup manager        |
| `custom-react-mic.tsx`         | Custom microphone recording wrapper           |

### Device & Setup

| Component                   | Description                                 |
| --------------------------- | ------------------------------------------- |
| `device-check.tsx`          | Pre-flight camera & microphone verification |
| `media-device-selector.tsx` | Dropdown to choose camera/mic device        |

### Timing

| Component             | Description                         |
| --------------------- | ----------------------------------- |
| `interview-timer.tsx` | Session countdown timer             |
| `auto-send-timer.tsx` | Auto-submit countdown for responses |

### Feedback & Evaluation

| Component                             | Description                               |
| ------------------------------------- | ----------------------------------------- |
| `feedback-content.tsx`                | Evaluation scores and feedback display    |
| `interview-completion.tsx`            | Interview finished screen with summary    |
| `interview-details-dialog.tsx`        | Modal showing interview details           |
| `auto-generate-feedback.tsx`          | Trigger evaluation generation             |
| `auto-generate-feedback-enhanced.tsx` | Enhanced evaluation trigger with progress |

### Other

| Component              | Description                          |
| ---------------------- | ------------------------------------ |
| `typing-indicator.tsx` | AI "thinking" animation (dots/pulse) |

---

## Job Components

11 components in `src/components/jobs/`:

| Component                 | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| Job Card                  | Displays job summary in list/grid views                   |
| Job Listing               | Paginated job board with search and filters               |
| Job Filters               | Skill, location, and keyword filter controls              |
| Job Detail                | Full job description view                                 |
| Application Form          | Job application submission with resume upload             |
| Application Modal         | Quick-apply modal dialog                                  |
| Create Job Form           | Job creation form (recruiter)                             |
| Edit Job Form             | Job editing form (recruiter)                              |
| Share Buttons             | Social media sharing (Facebook, LinkedIn, WhatsApp, etc.) |
| Job Description Generator | AI-powered description generation trigger                 |

---

## Dashboard Components

9 components in `src/components/dashboard/`:

| Component           | Description                               |
| ------------------- | ----------------------------------------- |
| Admin Dashboard     | Platform-wide metrics and management      |
| Recruiter Dashboard | Job and application statistics            |
| Candidate Dashboard | Application tracking and interview status |
| Stat Cards          | Numerical metric display cards            |
| Activity Feed       | Recent activity timeline                  |
| Charts              | Analytics visualizations (Recharts)       |

Each role gets a specialized dashboard view rendered conditionally based on `session.user.role`.

---

## Auth Components

4 components in `src/components/auth/`:

| Component     | Description                                          |
| ------------- | ---------------------------------------------------- |
| Login Form    | Email/password/role login with Zod validation        |
| Register Form | New account registration with role selection         |
| Role Guard    | HOC/wrapper for role-based component rendering       |
| Wishlist Form | Waitlist signup form (when registration is disabled) |

---

## Application Components

3 components in `src/components/applications/`:

| Component                | Description                                |
| ------------------------ | ------------------------------------------ |
| Applications List Client | Paginated list of candidate's applications |
| Resume Analysis          | AI resume parsing results display          |
| Match Results            | Job-candidate match score visualization    |

---

## Layout Components

Root-level layout components:

| Component         | File                    | Description                                               |
| ----------------- | ----------------------- | --------------------------------------------------------- |
| App Sidebar       | `app-sidebar.tsx`       | Collapsible navigation sidebar with role-aware menu items |
| Site Header       | `site-header.tsx`       | Top header bar with breadcrumbs, user menu, theme toggle  |
| Nav Main          | `nav-main.tsx`          | Primary navigation links (role-filtered)                  |
| Nav User          | `nav-user.tsx`          | User profile dropdown (avatar, name, sign out)            |
| Theme Toggle      | `theme-toggle.tsx`      | Dark/light/system mode switcher                           |
| Language Selector | `language-selector.tsx` | i18n locale picker                                        |
| Data Table        | `data-table.tsx`        | TanStack Table wrapper for paginated data display         |
| Floating Controls | `floating-controls.tsx` | Floating action buttons overlay                           |

---

## Key Patterns

### Server vs Client Components

- **Server Components** (default): Pages, layouts, and data-fetching components
- **Client Components** (with `'use client'`): Interactive components, forms, hooks-using components

### Component Composition

```tsx
// Typical page structure
<Layout>
  <SidebarProvider>
    <AppSidebar />
    <main>
      <SiteHeader />
      <PageContent /> {/* Client or Server component */}
    </main>
  </SidebarProvider>
</Layout>
```

### Form Pattern

```tsx
// Forms use React Hook Form + Zod + shadcn/ui
const form = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: { ... },
});

<Form {...form}>
  <FormField control={form.control} name="fieldName" render={...} />
  <Button type="submit">Submit</Button>
</Form>
```

### Data Fetching Pattern

```tsx
// TanStack React Query for server state
const { data, isLoading } = useQuery({
  queryKey: ['resource', id],
  queryFn: () => fetch(`/api/resource/${id}`).then((r) => r.json()),
});
```

### Conditional Role Rendering

```tsx
// Role-based UI rendering
const { data: session } = useSession();

{
  session?.user.role === 'admin' && <AdminDashboard />;
}
{
  session?.user.role === 'recruiter' && <RecruiterDashboard />;
}
{
  session?.user.role === 'candidate' && <CandidateDashboard />;
}
```
