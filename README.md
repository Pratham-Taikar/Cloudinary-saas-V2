# EasyUploads - Media SaaS Platform

EasyUploads is a state-of-the-art media processing SaaS platform designed for creators, developers, and teams to transform images and videos instantly. Leveraging a stateless architecture, it provides powerful tools for media optimization, background manipulation, and platform-specific formatting without the overhead of managing complex infrastructure.

## **Overview**

EasyUploads serves as a comprehensive media engine that simplifies the workflow of processing high-quality assets. By integrating advanced AI-driven transformations, the platform allows users to perform complex operations like background removal and generative background creation with minimal effort. The core philosophy of EasyUploads is **Stateless Processing**, meaning assets are processed on-demand and results are delivered instantly without persistent storage of the transformed files.

## **Features**

- **AI Background Removal**: Instantly remove backgrounds from images with high precision.
- **Generative AI Backgrounds**: Generate new, creative backgrounds based on text prompts using Cloudinary's AI engine.
- **Social Media Aspect Ratios**: Automatically resize and crop images for popular social platforms like Instagram (1:1, 4:5), Twitter (16:9, 3:1), and Facebook.
- **Image Effects & Filters**: Apply professional-grade filters and effects (e.g., Sepia, Grayscale, Cartoonify) with real-time previews.
- **Smart Video Compression**: Automatically optimize video files for web delivery, reducing file size while maintaining visual quality.
- **User Dashboard**: A centralized hub for users to track their usage, view uploaded videos, and manage their account.
- **Comprehensive Documentation**: Built-in docs covering API reference, authentication, and feature-specific guides.

## **Functions**

- `GET /api/user`: Fetches or initializes user data from the database, synchronized with Clerk.
- `POST /api/image-upload`: Handles secure image uploads to Cloudinary with usage limit enforcement.
- `POST /api/video-upload`: Manages video uploads, applies automatic quality optimization, and saves metadata to MongoDB.
- `GET /api/videos`: Retrieves a list of videos uploaded by the authenticated user.
- `GET /api/health/db`: Health check endpoint for database connectivity.

## **Project Structure**

```text
├── app/                  # Next.js App Router (pages, layouts, API routes)
│   ├── (app)/            # Core application features (Dashboard, Uploads, Tools)
│   ├── (auth)/           # Authentication routes (Sign-in, Sign-up)
│   ├── (billings)/       # Subscription and billing management
│   ├── (docs)/           # Integrated documentation pages
│   └── api/              # Backend API endpoints
├── components/           # Reusable UI components (VideoCard, LimitValidator, etc.)
├── lib/                  # Utility functions, database connection, and service configs
├── models/               # Mongoose schemas for MongoDB
├── public/               # Static assets (logos, icons, filter previews)
├── types/                # TypeScript type definitions
└── README.md             # Project documentation
```

## **Architecture**

The project follows a **Stateless Media Architecture**:

1. **Client Layer**: A modern Next.js frontend with real-time previews and optimistic UI updates.
2. **Auth Layer**: Clerk handles secure authentication and session management.
3. **API Layer**: Next.js Serverless Functions act as the bridge between the client, database, and Cloudinary.
4. **Processing Layer**: Cloudinary's dynamic transformation engine handles all media processing tasks on-the-fly.
5. **Data Layer**: MongoDB stores user profiles, usage counts, and video metadata.

## **Tech Stack**

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Media Engine**: [Cloudinary](https://cloudinary.com/) & [Next-Cloudinary](https://next.cloudinary.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Anime.js](https://animejs.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## **Database Design**

### User Model

- `userId`: Unique identifier from Clerk.
- `email`: User's primary email address.
- `username`: Display name.
- `imageCount`: Track total image transformations performed.
- `videoCount`: Track total video uploads/compressions.
- `plan`: Current subscription tier (`free`, `elite`, `mega`).

### Video Model

- `title`: User-provided title.
- `publicId`: Cloudinary unique identifier.
- `originalSize`: Size of the file before processing.
- `duration`: Length of the video in seconds.
- `userId`: Reference to the owner.

## **Clerk Auth**

Authentication is seamlessly integrated using Clerk. The system ensures that:

- Users must be authenticated to access processing tools.
- User profiles are automatically created in the MongoDB database upon their first login via the `/api/user` endpoint.
- Secure session tokens are used for all API requests to prevent unauthorized access.

## **Cloudinary Transformations**

EasyUploads leverages Cloudinary's powerful URL-based transformation API:

- **Resizing**: Uses `c_fill`, `w_xxx`, `h_xxx` for precise aspect ratio adjustments.
- **AI Tools**: Utilizes `e_background_removal` and `e_gen_background:prompt_...` for advanced image manipulation.
- **Effects**: Applies filters using `e_sepia`, `e_grayscale`, etc.
- **Video**: Uses `q_auto` and `f_mp4` to ensure optimal compression and compatibility across devices.

## **Processing Unit Implementation**

The "Processing Unit" is a virtualized engine that constructs Cloudinary transformation strings. Instead of performing heavy computations on the application server, the logic resides in how the `CldImage` component and backend upload streams are configured. This allows the platform to scale infinitely as the heavy lifting is offloaded to Cloudinary's global infrastructure.

## **Payment Gateway Logic**

The platform implements a tiered subscription logic integrated with **Razorpay**:

- **Checkout Flow**: Users are redirected to a secure checkout environment at `/checkout` when upgrading from the `/billings` page.
- **Order Creation**: A unique order is created on the backend using the Razorpay SDK (`/api/razorpay/order`).
- **Payment Verification**: Once the user completes the payment, the frontend receives a `razorpay_payment_id` and `razorpay_signature`, which are verified on the backend (`/api/razorpay/verify`) using HMAC SHA256 before upgrading the user's plan in MongoDB.
- **Plan Enforcement**: The application checks the user's current `plan` against the limits defined in `lib/services.ts` before allowing any processing task.
- **Limit Validation**: A dedicated `LimitReached` component provides a clear UI for users to upgrade when they exceed their tier's capacity.

### **Manual Testing (Test Mode)**

1. **Prerequisites**: Ensure `NEXT_PUBLIC_RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are correctly set in your `.env` file.
2. **Step 1**: Go to the `/billings` page and select either the **Elite** or **Mega** plan.
3. **Step 2**: You will be redirected to the `/checkout` page. Click on **Pay Now**.
4. **Step 3**: The Razorpay modal will open. Since it's in **Test Mode**, use any of the test payment methods:
   - **Card**: Use `4111 1111 1111 1111` for a successful payment. Use any expiry date and CVV.
   - **Netbanking**: Select any bank and click "Success".
5. **Step 4**: After successful payment, you will be redirected back to the dashboard, and your plan will be updated to the selected tier.
6. **Step 5**: Verify the upgrade in the dashboard or by checking the MongoDB user document.

## **RBAC Logic**

Role-Based Access Control is enforced through subscription tiers:

- **Access Control**: Features are unlocked based on the user's `plan`.
- **Backend Guard**: API routes validate usage counts against plan limits to prevent unauthorized over-usage.
- **UI State**: Navigation and tool availability dynamically adjust based on the user's tier.

## **Subscription & Credit Reset Logic**

EasyUploads features a robust automated subscription lifecycle management system:

- **Monthly Credit Reset**: Every 30 days from the user's `lastBillingDate`, their `imageCount` and `videoCount` are automatically reset to 0, providing fresh credits for the new month.
- **Automated Plan Expiry**: Premium plans (`elite`, `mega`) have a 30-day validity period.
- **Graceful Downgrade**: If a premium plan is not renewed (re-paid) before its `planExpiry` date, the system automatically reverts the user to the **Free** plan.
- **On-Demand Validation**: Subscription checks are performed in real-time whenever a user accesses their dashboard (`/api/user`), ensuring their credits and plan status are always up-to-date without needing a background cron job.
- **Renewal Reset**: Upon successful payment through Razorpay, the billing cycle and plan expiry are immediately extended by another 30 days, and current usage counts are reset.

## **Plans**

| Plan      | Price | Image Limit | Video Limit | Features                           |
| :-------- | :---- | :---------- | :---------- | :--------------------------------- |
| **Free**  | ₹0    | 10          | 3           | Basic processing, standard support |
| **Elite** | ₹149  | 75          | 20          | Priority processing, email support |
| **Mega**  | ₹399  | 250         | 50          | CDN delivery, dedicated support    |

## **Conclusion**

EasyUploads is built for the modern web, providing a fast, reliable, and scalable solution for media management. By combining the power of Next.js, Clerk, and Cloudinary, it delivers an industry-level experience that empowers users to transform their media with just a few clicks.
