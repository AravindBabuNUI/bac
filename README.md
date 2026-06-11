# Benefits Access Center

A high-performance, accessible lead-generation wizard built with React, Vite, and TailwindCSS. Guides users through a multi-step onboarding flow to connect them with benefit programs.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Routing | React Router v7 |
| Styling | TailwindCSS v3 + CSS custom properties |
| Forms | React Hook Form v7 + Zod v4 |
| Unit tests | Vitest v4 + React Testing Library |
| E2E tests | Playwright |
| Component explorer | Storybook 10 |
| Font | Lato via `@fontsource/lato` |

---

## Prerequisites

- **Node.js** 18+
- **pnpm** (install with `npm install -g pnpm`)

---

## Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Start the development server
pnpm dev
```

The app is served at **http://localhost:5173**.

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start Vite dev server with HMR |
| `pnpm build` | Type-check + production build |
| `pnpm preview` | Serve the production build locally |
| `pnpm lint` | Run ESLint across the project |
| `pnpm storybook` | Start Storybook on port 6006 |
| `pnpm build-storybook` | Build static Storybook site |
| `pnpm test:unit` | Run all unit tests (single pass) |
| `pnpm test:unit:watch` | Run unit tests in watch mode |
| `pnpm test:e2e` | Run Playwright E2E tests (headless) |
| `pnpm test:e2e:ui` | Run Playwright E2E tests with interactive UI |

---

## Running Tests

### Unit Tests

Unit tests use **Vitest** and **React Testing Library**. Test files live alongside their components as `*.test.tsx`.

```bash
# Run all unit tests once
pnpm test:unit

# Run in watch mode during development
pnpm test:unit:watch
```

Tests cover:
- **Atoms** — `Button`, `Input`, `Select`
- **Molecules** — `ProgressBar`, `StepLayout`, `WizardPage`
- **Components** — `Benefits`, `FeatureBanner`, `NotificationBanner`, `Footer`

### E2E Tests

End-to-end tests use **Playwright** targeting Chromium. The dev server starts automatically before the test run.

```bash
# Run all E2E tests (headless)
pnpm test:e2e

# Run with the interactive Playwright UI
pnpm test:e2e:ui
```

E2E tests cover:
- **`e2e/onboarding/button.spec.ts`** — Button rendering, styling, accessibility, and keyboard interaction
- **`e2e/onboarding/onboardingFlow.spec.ts`** — Full onboarding flow across all 4 steps through to the success page

> **Note:** Playwright browsers must be installed before the first run:
> ```bash
> pnpm exec playwright install chromium
> ```

### Storybook

Component stories live alongside each component as `*.stories.tsx`. All atoms and molecules have stories.

```bash
pnpm storybook
```

Storybook runs at **http://localhost:6006**.

---

## Project Structure

```
apps/
├── main.tsx                  # React root — mounts RouterProvider
├── routes.tsx                # createBrowserRouter route definitions
├── index.css                 # Tailwind directives + CSS variables + Lato font
│
├── assets/                   # SVG icons, images, and static files
├── components/               # Feature-level components
│   ├── benefits/             # Benefits list section
│   ├── featurebanner/        # Feature highlights banner
│   ├── footer/               # Site footer with navigation
│   ├── notificationbanner/   # Top-of-page notification bar
│   └── onboarding/           # Onboarding form and step components
│       └── steps/            # EmailForm, PersonalInfoForm, AddressInfoForm, PhoneNumberForm
├── constants/                # App-wide constants (banner messages, form defaults)
├── layouts/                  # Shared layout wrappers
├── pages/                    # Route-level page components
│   ├── error/                # ErrorPage (404 + runtime error boundary)
│   ├── onboarding/           # OnboardingLayout + OnboardingPage
│   └── terms/                # Terms & Conditions page
├── routes/                   # Route-level layout components
├── schemas/                  # Zod schemas (form validation + type inference)
├── test/                     # Vitest global setup (jest-dom matchers)
├── types/                    # Shared TypeScript types
├── ui/
│   ├── atoms/                # Primitive design-system components
│   │   ├── button/           # Button (variants: primary/secondary, rounded, icon support)
│   │   ├── input/            # Input (RHF Controller, focus pulse, shake-on-error animation)
│   │   └── select/           # Select (RHF Controller, typed options, error state)
│   └── molecules/            # Composed design-system components
│       └── wizard/           # ProgressBar, StepLayout, WizardPage, Wizard
└── utils/                    # Pure utility/helper functions

e2e/
├── helpers/
│   └── storybook.ts          # Storybook iframe URL helper
└── onboarding/
    ├── button.spec.ts        # Button component E2E tests
    └── onboardingFlow.spec.ts # Full onboarding flow E2E tests
```

---

## Architecture Notes

### Design System

The `apps/ui/` directory follows atomic design:

- **Atoms** (`ui/atoms/`) — standalone primitives: `Button`, `Input`, `Select`, `Label`
- **Molecules** (`ui/molecules/wizard/`) — composed from atoms: `ProgressBar`, `StepLayout`, `WizardPage`, `Wizard`

All atoms and molecules integrate with **React Hook Form** via the `Controller` API and expose full ARIA accessibility attributes (`aria-invalid`, `aria-required`, `aria-describedby`, `role="alert"` on field errors).

### Multi-Step Form

The onboarding wizard lives in `apps/components/onboarding/`. Each step is a standalone form component. Step progression, validation gating, and final submission are managed by `OnboardingForm.tsx` using `trigger()` from React Hook Form to validate only the fields relevant to the current step before advancing.

### Routing & Error Boundaries

Routes are defined in `apps/routes.tsx` using `createBrowserRouter`. The root route has `errorElement: <ErrorPage />` which handles both 404s (unmatched routes) and runtime errors, rendering a branded error page instead of the default React Router crash screen.

### Theming

Custom colors are defined as both Tailwind utilities and CSS custom properties on `:root`:

| Token | Value | Usage |
|---|---|---|
| `primary` | `#104E8B` | Primary buttons, focus rings |
| `secondary` | `#FF7F24` | CTA buttons |
| `error` | `#ef4444` | Validation error borders and text |
| `header` | `#1874CD` | Header accent |

### Path Aliases

The `@/` alias resolves to `apps/`. Additional aliases: `@assets`, `@components`, `@pages`, `@ui`, `@schemas`, `@utils`, `@types`.
