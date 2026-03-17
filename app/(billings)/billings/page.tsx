"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Star,
  Zap,
  Crown,
  ChevronDown,
  ArrowLeft,
  Sparkles,
  Shield,
  Clock,
  Users
} from "lucide-react";
import services, { planOrder, type PlanKey } from "@/lib/services";
import faqs from "@/lib/faqs";

const planMeta: Record<PlanKey, {
  tagline: string;
  features: string[];
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  popular?: boolean;
}> = {
  free: {
    tagline: "Perfect for getting started",
    features: ["Standard processing", "Basic support"],
    icon: Sparkles,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  elite: {
    tagline: "Best for creators & power users",
    badge: "Most Popular",
    features: ["High-quality optimization", "Priority processing", "Email support"],
    icon: Star,
    gradient: "from-primary/30 to-green-500/30",
    popular: true,
  },
  mega: {
    tagline: "For teams & heavy workloads",
    badge: "Best Value",
    features: ["High-quality optimization", "Priority processing", "Effective CDN delivery"],
    icon: Crown,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const faqVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
};

function BillingPage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen px-4 py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-wave-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-wave-medium" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-full blur-3xl animate-wave-fast" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-start"
        >
          <Link
            href="/home"
            className="btn btn-ghost rounded-xl gap-2 hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-primary/80 to-white bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Simple pricing. Upgrade anytime. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6"
        >
          {planOrder.map((key, index) => {
            const plan = services[key];
            const meta = planMeta[key];
            const Icon = meta.icon;
            const isFree = key === "free";
            const isPopular = meta.popular;

            return (
              <motion.div
                key={key}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className={`relative group rounded-3xl p-8 backdrop-blur-xl shadow-xl border transition-all duration-500 ${
                  isPopular
                    ? "bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border-primary/50 shadow-primary/20 scale-105"
                    : "bg-white/10 dark:bg-black/20 border-white/10 hover:border-white/20"
                }`}
              >
                {/* Popular Badge */}
                {meta.badge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  >
                    <span className="px-4 py-2 bg-gradient-to-r from-primary to-green-500 text-primary-content text-sm font-bold rounded-full shadow-lg">
                      {meta.badge}
                    </span>
                  </motion.div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                {/* Plan Name & Tagline */}
                <div className="space-y-2 mb-6">
                  <h2 className="text-3xl font-bold">{plan.name}</h2>
                  <p className="text-sm opacity-70">{meta.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">₹{plan.price}</span>
                    <span className="text-lg opacity-70">/month</span>
                  </div>
                  {plan.price > 0 && (
                    <p className="text-sm opacity-60 mt-1">Billed monthly</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{plan.videoLimit} video uploads</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{plan.imageLimit} image transformations</span>
                  </li>
                  {meta.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {isFree ? (
                  <button
                    disabled
                    className="btn btn-outline w-full rounded-xl cursor-not-allowed opacity-60"
                  >
                    Current Plan
                  </button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`btn w-full rounded-xl font-semibold transition-all duration-300 ${
                      isPopular
                        ? "btn-primary shadow-lg shadow-primary/30 hover:shadow-primary/50"
                        : "btn-outline hover:btn-primary"
                    }`}
                    onClick={() => router.push(`/checkout?plan=${key}`)}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Upgrade to {plan.name}
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-8 py-8"
        >
          <div className="flex items-center gap-2 text-sm opacity-70">
            <Shield className="w-4 h-4" />
            Secure payments
          </div>
          <div className="flex items-center gap-2 text-sm opacity-70">
            <Clock className="w-4 h-4" />
            Cancel anytime
          </div>
          <div className="flex items-center gap-2 text-sm opacity-70">
            <Users className="w-4 h-4" />
            Multiple user plans
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-base-content/70">Everything you need to know about our plans</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{ backgroundColor: isOpen ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)" }}
                  className="rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-lg cursor-pointer transition-all duration-300 hover:border-white/20"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-base pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 opacity-70" />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={faqVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-sm opacity-80 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <p className="text-sm opacity-60">
            Need help choosing the right plan?{" "}
            <Link href="/info" className="text-primary hover:underline">
              Contact our support team
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default BillingPage;
