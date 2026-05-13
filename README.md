Course platform (Class 1–6) built with Next.js App Router, Google sign-in, Razorpay payments, and MongoDB.

## Getting Started

### Prerequisites

- Node.js + npm
- A MongoDB database
- Google OAuth credentials
- Razorpay account + keys

### Environment

Create `.env.local` using [.env.example](file:///e:/Desktop/imma/.env.example).

Required:

- `MONGO_URI`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `ADMIN_EMAILS` (comma-separated full email allowlist for `/admin`, e.g. `admin@example.com,other@example.com`)
- `MARKETER_AUTH_SECRET` (cookie signing secret for marketer login; if not set, `NEXTAUTH_SECRET` is used)
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`

Optional:

- `COURSE_PRICE` (overrides all course prices)

## Marketers / Referrals

- Create marketers in the admin panel at `/admin` with a unique Marketer ID.
- Set a password during marketer creation (password is stored hashed, not in plain text).
- When a student enters that ID in “Referral Number (Optional)” during purchase, completed payments are attributed to that marketer and shown in the admin dashboard.
- Marketers can login at `/marketer/login` to see their own enrollments.

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
