<div align="center">

# ☁️ EasyUploads

### **The Intelligent Media Processing Platform**

*Transform, optimize, and deliver stunning visual content — all from one place.*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

[Features](#-features) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Contributing](#-contributing)

</div>

<br/>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Project Structure](#-project-structure)
- [Data Models](#-data-models)
- [Subscription & Billing](#-subscription--billing-lifecycle)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

<br/>

## 🔭 Overview

**EasyUploads** is a production-grade, AI-powered media processing SaaS platform engineered for creators, developers, and teams who need to transform images and videos at scale — without managing complex infrastructure.

Built on a **stateless processing architecture**, EasyUploads processes assets on-demand and delivers results instantly. No persistent storage of intermediate files. No server-side bottlenecks. Just fast, reliable media transformation.

### Why EasyUploads?

| Challenge | Our Solution |
|:---|:---|
| Complex media pipelines | One-click AI transformations with live preview |
| Platform-specific formatting | Automatic resizing for Instagram, Twitter, Facebook |
| Expensive infrastructure | Serverless architecture with zero DevOps overhead |
| Payment integration headaches | Turnkey Razorpay billing with automated lifecycle |

<br/>

## ✨ Features

### 🎨 AI-Powered Image Suite

| Capability | Description |
|:---|:---|
| **Background Removal** | High-precision subject isolation using Cloudinary AI |
| **Generative Fill** | Create new backgrounds from natural-language prompts |
| **Professional Filters** | Apply Sepia, Grayscale, and Cartoonify effects in real-time |

### 🎬 Smart Media Optimization

| Capability | Description |
|:---|:---|
| **Dynamic Resizing** | One-click crop and scale for major social platforms |
| **Video Compression** | Lossless quality optimization for web-ready delivery |
| **Format Conversion** | Automatic transcoding to optimal delivery formats |

### 💳 Subscription & Billing

| Capability | Description |
|:---|:---|
| **Tiered Plans** | Free, Elite (₹149/mo), and Mega (₹399/mo) tiers |
| **Razorpay Checkout** | PCI-compliant payment processing with signature verification |
| **Automated Lifecycle** | 30-day billing cycles with credit resets and graceful downgrades |

### 🖥️ User Experience

| Capability | Description |
|:---|:---|
| **Personal Dashboard** | Real-time usage tracking, upload history, and plan management |
| **Live Previews** | Instant transformation results before download |
| **Responsive Design** | Fully optimized for mobile and desktop workflows |

<br/>

## 🏗 Architecture

EasyUploads follows a **stateless, serverless-first** design pattern. All media processing is offloaded to Cloudinary's edge network, while Next.js API routes handle orchestration, authentication, and persistence.

### High-Level Data Flow

```
┌─────────────┐     ┌──────────────────┐     ┌──────────────┐     ┌───────────┐
│   Client    │────▸│  Next.js API     │────▸│  Cloudinary  │────▸│  CDN      │
│  (Browser)  │◂────│  Routes          │◂────│  Media Engine │◂────│  Delivery │
└─────────────┘     └────────┬─────────┘     └──────────────┘     └───────────┘
                             │
                    ┌────────▼─────────┐
                    │    MongoDB       │
                    │  (Persistence)   │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
        ┌─────▼─────┐ ┌─────▼─────┐ ┌──────▼──────┐
        │   Users   │ │  Videos   │ │  Payments   │
        └───────────┘ └───────────┘ └─────────────┘
```

### Request Lifecycle

```
 1. REQUEST       2. AUTH & RBAC       3. PROCESSING       4. PERSISTENCE
 ──────────       ─────────────       ──────────────       ──────────────
 Client sends     Clerk validates     Cloudinary           MongoDB stores
 media/params  →  identity, API    →  transforms asset  →  metadata, usage
 via API route    checks plan limits  returns CDN URL      counts, payments
```

<br/>

## 🛠️ Tech Stack

<table>
  <tr>
    <th>Layer</th>
    <th>Technology</th>
    <th>Purpose</th>
  </tr>
  <tr>
    <td><strong>Framework</strong></td>
    <td><a href="https://nextjs.org/">Next.js 16</a> (App Router)</td>
    <td>SSR, API routes, file-based routing</td>
  </tr>
  <tr>
    <td><strong>Language</strong></td>
    <td><a href="https://www.typescriptlang.org/">TypeScript 5</a></td>
    <td>End-to-end type safety</td>
  </tr>
  <tr>
    <td><strong>UI Library</strong></td>
    <td><a href="https://react.dev/">React 19</a></td>
    <td>Component-based rendering</td>
  </tr>
  <tr>
    <td><strong>Styling</strong></td>
    <td><a href="https://tailwindcss.com/">Tailwind CSS 4</a> + <a href="https://daisyui.com/">DaisyUI 5</a></td>
    <td>Utility-first CSS with pre-built components</td>
  </tr>
  <tr>
    <td><strong>Animation</strong></td>
    <td><a href="https://www.framer.com/motion/">Framer Motion 12</a> + <a href="https://animejs.com/">Anime.js 4</a></td>
    <td>Micro-interactions and page transitions</td>
  </tr>
  <tr>
    <td><strong>Auth</strong></td>
    <td><a href="https://clerk.com/">Clerk</a></td>
    <td>User authentication, session management</td>
  </tr>
  <tr>
    <td><strong>Database</strong></td>
    <td><a href="https://www.mongodb.com/">MongoDB 7</a> + <a href="https://mongoosejs.com/">Mongoose 9</a></td>
    <td>Document-based persistence with schema validation</td>
  </tr>
  <tr>
    <td><strong>Media Engine</strong></td>
    <td><a href="https://cloudinary.com/">Cloudinary</a> + <a href="https://next.cloudinary.dev/">next-cloudinary</a></td>
    <td>On-the-fly image/video transformations</td>
  </tr>
  <tr>
    <td><strong>Payments</strong></td>
    <td><a href="https://razorpay.com/">Razorpay</a></td>
    <td>Secure transaction processing</td>
  </tr>
  <tr>
    <td><strong>Notifications</strong></td>
    <td><a href="https://react-hot-toast.com/">React Hot Toast</a></td>
    <td>Non-blocking user feedback</td>
  </tr>
  <tr>
    <td><strong>Date Handling</strong></td>
    <td><a href="https://day.js.org/">Day.js</a></td>
    <td>Lightweight date manipulation</td>
  </tr>
</table>

<br/>

## 📁 Project Structure

```
cloudinary-saas/
├── app/                           # Next.js App Router
│   ├── (app)/                     # Core application routes
│   │   ├── home/                  #   ├─ Landing / Home page
│   │   ├── user-dashboard/        #   ├─ Usage dashboard
│   │   ├── video-upload/          #   ├─ Video upload & compression
│   │   ├── social-share/          #   ├─ Social media resizer
│   │   ├── remove-background/     #   ├─ AI background removal
│   │   ├── gen-background/        #   ├─ Generative fill backgrounds
│   │   ├── add-effects/           #   └─ Image filter effects
│   │   └── layout.tsx             #   App shell (sidebar, nav)
│   │
│   ├── (auth)/                    # Authentication routes
│   │   ├── sign-in/               #   └─ Clerk sign-in page
│   │   └── sign-up/               #   └─ Clerk sign-up page
│   │
│   ├── (billings)/                # Subscription management
│   │   ├── billings/              #   └─ Pricing grid
│   │   └── checkout/              #   └─ Razorpay checkout flow
│   │
│   ├── (docs)/                    # Documentation pages
│   ├── (info)/                    # Informational pages
│   │
│   ├── api/                       # Server-side API routes
│   │   ├── health/                #   ├─ Health check endpoint
│   │   ├── user/                  #   ├─ User profile & subscription
│   │   ├── image-upload/          #   ├─ Image processing pipeline
│   │   ├── video-upload/          #   ├─ Video processing pipeline
│   │   ├── videos/                #   ├─ Video metadata queries
│   │   └── razorpay/              #   └─ Payment order & verification
│   │
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing page
│
├── components/                    # Reusable UI components
│   ├── VideoCard.tsx              #   Video preview card
│   └── limitValidator.tsx         #   Usage limit checker
│
├── lib/                           # Core utilities
│   ├── db.ts                      #   MongoDB connection singleton
│   ├── faqs.ts                    #   FAQ content data
│   ├── services.ts                #   Plan configurations & limits
│   └── subscription.ts            #   Billing cycle & expiry logic
│
├── models/                        # Mongoose schemas
│   ├── user.models.ts             #   User document schema
│   ├── video.models.ts            #   Video metadata schema
│   └── payment.models.ts          #   Payment history schema
│
├── types/                         # TypeScript type definitions
│   └── index.ts                   #   Shared interfaces
│
├── public/                        # Static assets
│   ├── saaslogo.png               #   Brand logo
│   └── ...                        #   Demo images & icons
│
├── sample.env                     # Environment variable template
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies & scripts
└── README.md                      # ← You are here
```

<br/>

## 🗃 Data Models

### User

> Tracks identity, subscription tier, usage quotas, and billing cycle state.

| Field | Type | Description |
|:---|:---|:---|
| `userId` | `string` | Clerk-issued unique identifier |
| `plan` | `enum` | Current tier: `free` · `elite` · `mega` |
| `imageCount` | `number` | Images processed in current billing cycle |
| `videoCount` | `number` | Videos processed in current billing cycle |
| `lastBillingDate` | `Date` | Start of the current 30-day cycle |
| `planExpiry` | `Date?` | Expiration timestamp for premium plans |

### Video

> Stores metadata for uploaded and optimized video assets.

| Field | Type | Description |
|:---|:---|:---|
| `publicId` | `string` | Cloudinary asset identifier |
| `title` | `string` | User-defined video title |
| `originalSize` | `number` | Original file size in bytes |
| `compressedSize` | `number` | Post-optimization file size |
| `duration` | `number` | Video duration in seconds |
| `userId` | `string` | Reference to the owning user |

### PaymentHistory

> Immutable audit log of all processed transactions.

| Field | Type | Description |
|:---|:---|:---|
| `razorpay_order_id` | `string` | Razorpay order identifier |
| `razorpay_payment_id` | `string` | Razorpay payment identifier |
| `amount` | `number` | Transaction amount (INR) |
| `plan` | `string` | Purchased plan tier |
| `status` | `enum` | Transaction state: `success` · `failed` |

<br/>

## 🔄 Subscription & Billing Lifecycle

### Plan Tiers

| Plan | Price | Images/mo | Videos/mo |
|:---|:---|:---|:---|
| **Free** | ₹0 | 10 | 3 |
| **Elite** | ₹249/mo | 75 | 20 |
| **Mega** | ₹649/mo | 250 | 50 |

### Automated Credit Reset

EasyUploads implements a lazy-evaluation billing cycle. Every 30 days from the user's `lastBillingDate`, usage counters are automatically reset to zero. This check is performed on-demand at dashboard access — no background cron jobs required.

```
Day 1            Day 30           Day 60
  │                │                │
  ▼                ▼                ▼
 [Cycle Start] → [Auto Reset] → [Auto Reset]
  Credits: 0       Credits: 0       Credits: 0
```

### Plan Expiry & Graceful Downgrade

Premium subscriptions have a fixed 30-day validity. If a plan is not renewed before its `planExpiry` timestamp, the system automatically and gracefully reverts the user to the **Free** tier — no data is lost, and the user retains access to their existing assets.

### Payment Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  1. CHECKOUT │───▸│  2. ORDER    │───▸│  3. VERIFY   │───▸│  4. ACTIVATE │
│              │    │              │    │              │    │              │
│ User selects │    │ Backend      │    │ HMAC SHA256  │    │ Plan tier    │
│ plan from    │    │ creates      │    │ signature    │    │ upgraded,    │
│ pricing grid │    │ Razorpay     │    │ validation   │    │ cycle reset  │
│              │    │ order        │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

<br/>

## 📡 API Reference

All endpoints are served under `/api` and require Clerk authentication unless noted otherwise.

| Method | Endpoint | Auth | Description |
|:---|:---|:---|:---|
| `GET` | `/api/health` | ✗ | Service health check |
| `GET` | `/api/user` | ✓ | Fetch user profile; triggers subscription validation |
| `POST` | `/api/image-upload` | ✓ | Process image upload with RBAC limit enforcement |
| `POST` | `/api/video-upload` | ✓ | Handle video optimization and persist metadata |
| `GET` | `/api/videos` | ✓ | Retrieve video metadata for authenticated user |
| `GET` | `/api/user/payments` | ✓ | Fetch authenticated user's transaction history |
| `POST` | `/api/razorpay/order` | ✓ | Create a new Razorpay subscription order |
| `POST` | `/api/razorpay/verify` | ✓ | Verify payment signature and upgrade user plan |

<br/>

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or **yarn** / **pnpm**)
- **MongoDB** instance (local or [Atlas](https://www.mongodb.com/cloud/atlas))
- API keys for [Clerk](https://clerk.com), [Cloudinary](https://cloudinary.com), and [Razorpay](https://razorpay.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/cloudinary-saas.git
cd cloudinary-saas

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp sample.env .env
# Then edit .env with your actual credentials (see below)

# 4. Start the development server
npm run dev
```

The app will be available at **`http://localhost:3000`**.

### Available Scripts

| Script | Command | Description |
|:---|:---|:---|
| `dev` | `npm run dev` | Start Next.js in development mode with HMR |
| `build` | `npm run build` | Create an optimized production build |
| `start` | `npm run start` | Run the production server |
| `lint` | `npm run lint` | Run ESLint across the codebase |

<br/>

## 🔐 Environment Variables

Create a `.env` file in the project root. A template is provided at [`sample.env`](sample.env).

| Variable | Required | Description |
|:---|:---|:---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✓ | Clerk frontend publishable key |
| `CLERK_SECRET_KEY` | ✓ | Clerk backend secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | ✓ | Sign-in route (default: `/sign-in`) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | ✓ | Redirect after sign-in (default: `/home`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | ✓ | Redirect after sign-up (default: `/home`) |
| `DATABASE_URL` | ✓ | MongoDB connection string |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ✓ | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | ✓ | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✓ | Cloudinary API secret |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | ✓ | Razorpay publishable key ID |
| `RAZORPAY_KEY_SECRET` | ✓ | Razorpay server-side secret |

> [!CAUTION]
> Never commit your `.env` file to version control. The `.gitignore` is already configured to exclude it.

<br/>

## 🗺 Roadmap

- [ ] **Batch Processing** — Upload and transform multiple assets in parallel
- [ ] **Webhook Events** — Real-time subscription status notifications
- [ ] **Admin Dashboard** — Platform-wide analytics and user management
- [ ] **CDN Analytics** — Track delivery performance and bandwidth usage
- [ ] **Export Presets** — Save and reuse custom transformation configurations
- [ ] **Team Workspaces** — Shared accounts with role-based access

<br/>

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feat/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feat/amazing-feature`)
5. **Open** a Pull Request

Please ensure your code follows the existing style conventions and passes `npm run lint`.

<br/>

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<br/>

---

<div align="center">

**Built with ❤️ using Next.js, Cloudinary, and modern web technologies.**

[⬆ Back to Top](#️-easyuploads)

</div>
