# EasySeva — Government Services, Made Easier

EasySeva is a citizen-first web portal for discovering, applying for, and tracking
government services. It is built as an **HCI (Human–Computer Interaction) prototype**
focused on first-time and low-digital-literacy users, with a Tamil Nadu service context.

> **Academic prototype.** All submissions are simulated and no real government data is
> processed. Do not enter real personal information.

## ✨ Features

- **Guided, step-by-step applications** — long government forms are broken into small,
  plain-language steps with inline help and examples.
- **Passwordless OTP login** — sign in with just an email; a one-time code is emailed
  (or shown on screen in demo mode when SMTP is not configured).
- **Service discovery** — browse by category or use "Find a service" to describe a need
  in everyday language.
- **Document upload** — drag/drop or camera capture, with per-document guidance,
  validation, and clear status.
- **Save & resume** — drafts are persisted so users can finish later.
- **Application tracking** — track by reference number with a clear status timeline.
- **Payments** — a demo payment flow (Stripe-compatible) for services with fees.
- **Notifications** — in-app updates as an application progresses.
- **Multilingual** — English, தமிழ் (Tamil), and हिंदी (Hindi).
- **Accessibility built in** — large-text and high-contrast modes, reduced-motion
  support, skip links, visible focus rings, ARIA labelling, and 44px+ touch targets.

## 🧠 HCI principles applied

| Principle (Nielsen / general HCI)      | Where it shows up                                                        |
| -------------------------------------- | ----------------------------------------------------------------------- |
| Visibility of system status           | Progress bars, step indicators, status timeline, loading/saving states  |
| Match with the real world             | Plain language, task-based grouping ("Get a certificate"), ₹ formatting  |
| User control & freedom                | Back links, "Save & finish later", editable review, cancellable dialogs  |
| Error prevention                      | Inline validation, confirmation dialog before submit, file-type checks   |
| Recognition over recall               | Review screen summarises every entry; examples shown for each document   |
| Flexibility & efficiency              | OTP paste support, keyboard navigation, multi-language, resume drafts    |
| Aesthetic & minimalist design         | Clean, consistent design tokens; one primary action per screen           |
| Help users recover from errors        | Human-readable error messages with next steps                           |
| Help & documentation                  | Dedicated Help page and contextual hints                                 |
| Accessibility                         | WCAG-minded contrast, text scaling, reduced motion, semantics           |

## 🛠 Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with a custom design-token theme
- **Prisma** ORM + **PostgreSQL**
- **jose** for JWT session cookies, **bcryptjs**, **nodemailer** (OTP email)
- **Stripe** (demo/compatible payment flow)
- **Jest** + **ts-jest** for unit tests

## 🚀 Getting started (local)

### Prerequisites
- Node.js 20+ (22 recommended)
- A PostgreSQL database

### Setup

```bash
# 1. Install dependencies (also runs `prisma generate`)
npm install

# 2. Configure environment
cp .env.example .env
#   → set DATABASE_URL and JWT_SECRET

# 3. Apply the database schema
npm run db:migrate

# 4. Start the dev server
npm run dev
```

Open http://localhost:3000.

Because SMTP is unset by default, **the OTP is shown on the verification screen**
(demo mode), so you can log in without configuring email.

## 🧪 Testing

```bash
npm test             # run the unit test suite
npm run test:coverage
```

## ☁️ Deployment

The app deploys cleanly to any Node host with a PostgreSQL database.

**Vercel (recommended for this stack)**
1. Import the repository into Vercel.
2. Add a PostgreSQL database (e.g. Neon from the Vercel Marketplace) — this sets
   `DATABASE_URL` automatically.
3. Add `JWT_SECRET` (and optionally the Stripe/SMTP variables).
4. Deploy. The build runs `prisma generate && prisma migrate deploy && next build`,
   so the schema is created on first deploy.

Uploaded files are stored on disk in development; on serverless hosts the upload
endpoint accepts the file and records its metadata (no persistent blob store is
required for the prototype).

## 📁 Project structure

```
app/                 App Router routes
  api/               Route handlers (auth, applications, payment, upload, …)
  apply/[service]/   Multi-step application flow (eligibility → form → documents → review → confirmation)
  services/          Service discovery & detail pages
components/
  ui/                Reusable primitives (Button, Card, Dialog, Alert, …)
  features/          Domain components (ServiceCard, DocumentUpload, PaymentModal, …)
  layout/            Header, MobileNav, PageLayout
context/             React contexts (Auth, App state)
lib/                 Prisma client, auth, utils, translations, mock service data
prisma/              Schema & migrations
__tests__/           Jest unit tests
```

## 📄 License

Academic / educational use.
