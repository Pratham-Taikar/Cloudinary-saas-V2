"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import toast from "react-hot-toast";
import services, { type PlanKey } from "@/lib/services";
import { CreditCard, ShieldCheck, Zap, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planKey = searchParams.get("plan") as PlanKey;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        toast.error("Failed to load user information");
      }
    };
    fetchUser();
  }, []);

  if (!planKey || !services[planKey] || planKey === "free") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Invalid Plan Selected</h1>
          <p className="opacity-70">Please select a valid paid plan to upgrade.</p>
          <Link href="/billings" className="btn btn-primary">
            Back to Plans
          </Link>
        </div>
      </div>
    );
  }

  const plan = services[planKey];

  const handlePayment = async () => {
    if (!user) {
      toast.error("User not loaded. Please try again.");
      return;
    }

    setLoading(true);
    try {
      // 1. Create Order
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        console.error("Order creation failed response:", orderData);
        throw new Error(orderData.error || `Order creation failed with status ${orderRes.status}`);
      }

      // 2. Open Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "EasyUploads",
        description: `Upgrade to ${plan.name} Plan`,
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            setLoading(true);
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: user.userId,
                planKey: planKey,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok) {
              toast.success(`Successfully upgraded to ${plan.name} plan!`);
              router.push("/user-dashboard");
            } else {
              throw new Error(verifyData.error || "Verification failed");
            }
          } catch (error: any) {
            toast.error(error.message);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: user.username || "",
          email: user.email || "",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="max-w-xl mx-auto">
        <Link href="/billings" className="btn btn-ghost mb-8 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Pricing
        </Link>

        <div className="card bg-base-100 shadow-2xl border border-white/10">
          <div className="card-body space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">Checkout</h1>
                <p className="opacity-70 mt-1">Review your plan upgrade</p>
              </div>
              <div className="badge badge-primary badge-lg py-4 font-bold">
                {plan.name}
              </div>
            </div>

            <div className="bg-base-200 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="opacity-70">Plan Duration</span>
                <span className="font-semibold">Monthly</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-70">Video Limit</span>
                <span className="font-semibold">{plan.videoLimit} uploads</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-70">Image Limit</span>
                <span className="font-semibold">{plan.imageLimit} transforms</span>
              </div>
              <div className="divider"></div>
              <div className="flex justify-between items-center text-xl">
                <span className="font-bold">Total Amount</span>
                <span className="font-bold text-primary">₹{plan.price}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm opacity-70">
                <ShieldCheck className="w-5 h-5 text-success" />
                Secure payment powered by Razorpay
              </div>
              <div className="flex items-center gap-3 text-sm opacity-70">
                <Zap className="w-5 h-5 text-warning" />
                Instant access to higher limits after payment
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading || !user}
              className="btn btn-primary btn-lg w-full rounded-2xl gap-2 h-16 text-lg"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-6 h-6" />
                  Pay ₹{plan.price} Now
                </>
              )}
            </button>

            <p className="text-center text-xs opacity-50 px-8">
              By clicking "Pay Now", you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
