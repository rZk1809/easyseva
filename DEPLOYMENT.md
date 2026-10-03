# Deploying EasySeva

The app is a Next.js 16 server app backed by PostgreSQL (via Prisma). It needs:

- a **PostgreSQL** database, and
- two environment variables: `DATABASE_URL` and `JWT_SECRET`
  (Stripe/SMTP variables are optional — the app runs in demo mode without them).

A Vercel project named **easyseva** is already created and linked to the GitHub
repository, with production branch `main`. The steps below finish the first
production deployment.

## Option A — Vercel + Neon Postgres (recommended)

1. Open the **easyseva** project on https://vercel.com/dashboard.
2. Go to the **Storage** tab → **Create Database** → **Neon (Serverless Postgres)**
   → connect it to this project. This automatically adds `DATABASE_URL`
   (and related `POSTGRES_*`) environment variables to all environments.
3. Go to **Settings → Environment Variables** and add:

   | Key          | Value                                                            |
   | ------------ | ---------------------------------------------------------------- |
   | `JWT_SECRET` | `ofH3H8nRFpf-DfWsQgS21Gl51wSYCj_6od_f70HK2C11k1pgnprjtOcTR25zJE3G` (or any long random string) |

   Optionally add `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
   and the `SMTP_*` variables for real email/payments.
4. Go to the **Deployments** tab → **Redeploy** (or just push any commit to `main`).

The build command is `prisma generate && prisma migrate deploy && next build`,
so the database schema is created automatically on the first deploy.

Your live URL will be `https://easyseva-<hash>.vercel.app` and the production
alias `https://easyseva.vercel.app` (shown in the dashboard once deployed).

## Option B — Render

1. On https://render.com, **New → Blueprint** (or **Web Service**) and connect
   the `rZk1809/easyseva` repository.
2. Create a **PostgreSQL** instance; copy its **Internal/External Database URL**.
3. For the web service set:
   - **Build command:** `npm install && npm run build`
   - **Start command:** `npm run start`
   - **Environment variables:** `DATABASE_URL` (from step 2) and `JWT_SECRET`.
4. Deploy. Migrations run during the build step.

## Local development

See the main [README](./README.md#-getting-started-local).
