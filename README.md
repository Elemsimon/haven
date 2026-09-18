# Ryan Heights Hotel — Full-Stack Next.js App

A production-ready, luxury hotel booking platform built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Sanity CMS**, **NextAuth.js**, and **Stripe**.

---

## ✨ Features

### UI
- Pixel-perfect luxury design system (Ryan brand)
- `Playfair Display` serif headings + `Jost` body text
- Glassmorphism booking bar, gold accent system, dark alpine palette
- Scroll-triggered reveal animations throughout
- Fully responsive (mobile, tablet, desktop)

### Pages
| Route | Description |
|---|---|
| `/` | Full landing page (Hero, About, Rooms, Experiences, Gallery, CTA, Footer) |
| `/rooms` | Filterable room listing (type filter + search) |
| `/rooms/[slug]` | Room detail with photo gallery, amenities, booking CTA |
| `/auth` | Sign in / Sign up (credentials + Google + GitHub) |
| `/users/[id]` | User dashboard (bookings table, spending chart, review modal) |
| `/contact` | Contact & enquiry form |
| `/studio` | Sanity CMS studio |

### Functionality (from hotel-management)
- **Sanity CMS** — content management for rooms, bookings, reviews, users
- **NextAuth v4** — GitHub, Google, and credentials auth
- **Stripe** — payment processing via Checkout Sessions
- **Stripe Webhook** — automatic booking creation on payment success
- **SWR** — data fetching with stale-while-revalidate
- **Review system** — guests can rate stays from their dashboard
- **Route protection** — `/users/*` requires authentication (middleware)

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure environment variables
```bash
cp .env.example .env.local
# Fill in all values in .env.local
```

### 3. Set up Sanity
```bash
# Create a project at https://sanity.io/
# Add your project ID and dataset to .env.local
# Visit /studio to manage content
```

### 4. Set up Stripe
```bash
# Get keys from https://dashboard.stripe.com/
# For local webhook testing:
stripe listen --forward-to localhost:3000/api/webhook
```

### 5. Run development server
```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 📁 Project Structure

```
Ryan-heights-hotel/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home landing page
│   ├── layout.tsx                # Root layout (auth, toast)
│   ├── loading.tsx               # Global loading state
│   ├── not-found.tsx             # Custom 404
│   ├── error.tsx                 # Global error boundary
│   ├── auth/page.tsx             # Sign in / Sign up
│   ├── rooms/                    # Rooms listing + detail
│   ├── users/[id]/               # User dashboard
│   ├── contact/page.tsx          # Contact form
│   └── studio/                   # Sanity Studio
│
├── components/sections/          # Reusable UI sections
│   ├── Navbar.tsx                # Fixed nav + fullscreen menu overlay
│   ├── Hero.tsx                  # Full-viewport hero + booking bar
│   ├── About.tsx                 # Brand story + stats grid
│   ├── Rooms.tsx                 # Featured rooms preview
│   ├── FeaturedRoomSection.tsx   # Live Sanity featured room
│   ├── Experiences.tsx           # Alternating image/text rows
│   ├── Gallery.tsx               # Masonry grid + lightbox
│   ├── CTA.tsx                   # Full-bleed booking CTA
│   └── Footer.tsx                # Newsletter + links
│
├── src/
│   ├── app/api/                  # API Routes
│   │   ├── auth/[...nextauth]/   # NextAuth handler
│   │   ├── rooms/[slug]/         # Single room by slug
│   │   ├── rooms-list/           # All rooms list
│   │   ├── room-reviews/[id]/    # Room reviews
│   │   ├── stripe/               # Create Stripe session
│   │   ├── webhook/              # Stripe webhook handler
│   │   ├── users/                # User data + review submission
│   │   ├── user-bookings/        # User's booking history
│   │   └── sanity/signUp/        # Email/password registration
│   │
│   ├── libs/
│   │   ├── auth.ts               # NextAuth config
│   │   ├── getSession.ts         # Server-side session helper
│   │   ├── apis.ts               # Sanity read queries
│   │   ├── apis-server.ts        # Sanity write mutations
│   │   ├── sanity.ts             # Sanity client (public)
│   │   ├── sanity.server.ts      # Sanity client (server, token)
│   │   ├── sanityQueries.ts      # GROQ query definitions
│   │   └── stripe.ts             # Stripe.js loader
│   │
│   └── models/                   # TypeScript type definitions
│       ├── room.ts
│       ├── booking.ts
│       ├── review.ts
│       └── user.ts
│
├── middleware.ts                  # Route protection
├── sanity.config.ts              # Sanity schema definitions
├── tailwind.config.ts            # Custom design tokens
└── .env.example                  # Environment variable template
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Font (headings) | `Playfair Display` italic |
| Font (body) | `Jost` |
| Primary bg | `#1A1815` (stone-900) |
| Text | `#F5F0E8` (cream) |
| Accent | `#B09060` (gold-500) |
| Secondary bg | `#333028` (stone-800) |

---

## 🔑 Required Environment Variables

| Variable | Description |
|---|---|
| `NEXTAUTH_SECRET` | Random secret for JWT signing |
| `NEXTAUTH_URL` | Your app URL |
| `GITHUB_CLIENT_ID/SECRET` | GitHub OAuth app |
| `GOOGLE_CLIENT_ID/SECRET` | Google OAuth app |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `SANITY_STUDIO_TOKEN` | Sanity write token |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `APP_URL` | Public app URL (for Stripe redirects) |
