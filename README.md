# EasyUploads - Media SaaS Platform

EasyUploads is a state-of-the-art media processing SaaS platform designed for creators, developers, and teams to transform images and videos instantly. Leveraging a stateless architecture, it provides powerful tools for media optimization, background manipulation, and platform-specific formatting without the overhead of managing complex infrastructure.

## **Overview**

EasyUploads serves as a comprehensive media engine that simplifies the workflow of processing high-quality assets. By integrating advanced AI-driven transformations, the platform allows users to perform complex operations like background removal and generative background creation with minimal effort. The core philosophy of EasyUploads is **Stateless Processing**, meaning assets are processed on-demand and results are delivered instantly without persistent storage of the transformed files.

## **Key Features**

- **AI-Powered Image Suite**:
  - **Background Removal**: Instantly remove backgrounds with high precision.
  - **Generative Fill**: Create new, creative backgrounds based on text prompts.
  - **Professional Filters**: Apply Sepia, Grayscale, and Cartoonify effects in real-time.
- **Smart Media Optimization**:
  - **Dynamic Resizing**: Automatically crop and scale for Instagram, Twitter, and Facebook.
  - **Video Compression**: Optimize large video files for web delivery without quality loss.
- **Subscription & Billing**:
  - **Tiered Access**: Choose between Free, Elite, and Mega plans.
  - **Razorpay Integration**: Secure, industry-standard payment processing.
  - **Automated Lifecycle**: 30-day billing cycles with automated credit resets and plan expiry.
- **User Experience**:
  - **Personal Dashboard**: Track usage, view upload history, and manage subscription.
  - **Live Previews**: See transformation results instantly before downloading.
  - **Responsive Design**: Fully optimized for mobile and desktop workflows.

## **Architecture & Tech Stack**

### **The Stack**

- **Frontend**: [Next.js 16 (App Router)](https://nextjs.org/) for server-side rendering and routing.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/) for a modern, responsive interface.
- **Auth**: [Clerk](https://clerk.com/) for secure, scalable user authentication.
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) for flexible data modeling.
- **Media Engine**: [Cloudinary](https://cloudinary.com/) for on-the-fly image and video transformations.
- **Payments**: [Razorpay](https://razorpay.com/) for secure transaction handling.

### **Data Flow Architecture**

1. **Request Phase**: The client sends media assets or transformation parameters to Next.js API routes.
2. **Logic Phase**: API routes validate user permissions (RBAC), check usage limits, and interact with the database.
3. **Processing Phase**: For media tasks, parameters are sent to Cloudinary, which returns transformed asset URLs.
4. **Persistence Phase**: Transactional data (payment history, video metadata, usage counts) is stored in MongoDB.

## **Project Structure**

```text
├── app/                  # Next.js App Router (pages, layouts, API routes)
│   ├── (app)/            # Core application features (Dashboard, Uploads, Tools)
│   ├── (auth)/           # Authentication routes (Sign-in, Sign-up)
│   ├── (billings)/       # Subscription, Checkout, and Pricing
│   ├── (docs)/           # Integrated documentation pages
│   └── api/              # Backend API endpoints (Auth, Media, Payments)
├── components/           # Reusable UI components (VideoCard, LimitValidator, etc.)
├── lib/                  # Core utilities (DB connection, Subscription logic, Service configs)
├── models/               # Mongoose schemas (User, Video, PaymentHistory)
├── public/               # Static assets and icons
├── types/                # TypeScript definitions
└── README.md             # Project documentation
```

## **Database Design**

### **User Model**

Tracks identity, usage limits, and subscription status.

- `userId`: Clerk's unique identifier.
- `plan`: Current tier (`free`, `elite`, `mega`).
- `imageCount` / `videoCount`: Usage tracking for the current cycle.
- `lastBillingDate`: Start of the current 30-day cycle.
- `planExpiry`: Expiration date for premium subscriptions.

### **Video Model**

Stores metadata for uploaded and optimized video assets.

- `publicId`: Cloudinary unique ID for asset retrieval.
- `originalSize` / `duration`: Technical details of the processed video.
- `userId`: Reference to the owner.

### **PaymentHistory Model**

Maintains a secure log of all successful transactions.

- `razorpay_order_id` / `razorpay_payment_id`: Transaction identifiers.
- `amount` / `plan`: Details of the purchased subscription.
- `status`: Transaction state (`success`, `failed`).

## **Subscription & Payment Lifecycle**

### **Automated Credit Reset**

EasyUploads implements an automated 30-day credit cycle:

- Every 30 days from the `lastBillingDate`, the system automatically resets usage counts to 0.
- This logic is executed on-demand when the user accesses the dashboard, ensuring high performance without heavy background tasks.

### **Plan Expiry & Graceful Downgrade**

- Premium plans have a fixed 30-day validity.
- If a plan is not renewed by its `planExpiry` date, the user is automatically and gracefully reverted to the **Free** plan.

### **Payment Flow**

1. **Checkout**: Secure checkout page at `/checkout` initiated from the `/billings` pricing grid.
2. **Order**: Backend creates a Razorpay order with the correct plan amount.
3. **Verification**: Secure signature verification using HMAC SHA256 before updating user tiers.
4. **Renewal**: Successful payment immediately extends the cycle by another 30 days and resets current usage.

## **API Endpoints**

| Method   | Endpoint               | Description                                                |
| :------- | :--------------------- | :--------------------------------------------------------- |
| **GET**  | `/api/user`            | Fetches user profile and triggers subscription validation. |
| **POST** | `/api/image-upload`    | Processes image uploads and applies RBAC limits.           |
| **POST** | `/api/video-upload`    | Handles video optimization and metadata storage.           |
| **GET**  | `/api/user/payments`   | Retrieves the authenticated user's transaction history.    |
| **POST** | `/api/razorpay/order`  | Creates a new subscription order for Razorpay.             |
| **POST** | `/api/razorpay/verify` | Verifies payment signatures and upgrades user plans.       |

## **Setup & Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/easyuploads.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Configuration**:
   Create a `.env` file with the following keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY`
   - `DATABASE_URL` (MongoDB)
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`
4. **Run the development server**:
   ```bash
   npm run dev
   ```

## **Conclusion**

EasyUploads is a production-ready SaaS platform that bridges the gap between complex media engineering and intuitive user interfaces. By leveraging a modern serverless architecture and powerful AI tools, it provides a scalable, secure, and performant solution for digital asset management.
