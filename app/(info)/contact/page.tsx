"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const adminEmail = "prathamtaikar26@gmail.com";

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

const [loading, setLoading] = useState(false);

const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
        alert("Please fill all fields");
        return;
    }

    setLoading(true);

    const subject = encodeURIComponent(
        `User Inquiry Request • EasyUploads`
    );

    const body = encodeURIComponent(
`Hello EasyUploads Team,
My name is ${form.name}, and I would like to reach out regarding:

${form.message}

You can contact me back at: ${form.email}
Looking forward to your response.

Best regards,  
${form.name}
`
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${adminEmail}&su=${subject}&body=${body}`;
    const mailtoFallback = `mailto:${adminEmail}?subject=${subject}&body=${body}`;

    const newWindow = window.open(gmailUrl, "_blank");

    if (!newWindow) {
        window.location.href = mailtoFallback;
    }

    setTimeout(() => {
        setLoading(false);
        setForm({ name: "", email: "", message: "" });
    }, 800);
};

    return (
        <div className="min-h-screen bg-[#0a0f1e] text-white">

            {/* ================= NAV ================= */}
            <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b border-white/10">
                <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
                    <img src="/saaslogo.png" alt="weblogo" className="sm:w-50 w-36" />

                    <div className="flex gap-3">
                        <Link href="/home" className="btn btn-outline btn-sm">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </header>

            {/* ================= HERO ================= */}
            <section className="text-center py-20 px-6">
                <h1 className="text-4xl sm:text-5xl font-extrabold">
                    Get in touch
                </h1>

                <p className="mt-4 text-white/70 max-w-xl mx-auto">
                    Have questions about EasyUploads? Any problems or
                    need support? We're here to help.
                </p>
            </section>

            {/* ================= MAIN ================= */}
            <section className="max-w-6xl mx-auto px-6 pb-24 flex justify-center items-">
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* NAME */}
                        <div>
                            <label className="text-sm text-white/70">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                                className="w-full mt-2 px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm text-white/70">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                className="w-full mt-2 px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* MESSAGE */}
                        <div>
                            <label className="text-sm text-white/70">Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                placeholder="Write your message..."
                                className="w-full mt-2 px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="w-full py-3 cursor-pointer rounded-lg btn btn-primary transition font-medium"
                        >
                            Send Message
                        </button>

                    </form>
                </div>

            </section>

            {/* ================= CTA ================= */}
            <section className="text-center py-20 border-t border-white/10">
                <h2 className="text-3xl font-bold mb-4">
                    Prefer exploring first?
                </h2>

                <p className="text-white/70 mb-6">
                    Check out the platform and see what you can build.
                </p>

                <Link href="/sign-in" className="btn btn-primary px-8">
                    Go to Dashboard
                </Link>
            </section>

            {/* ================= FOOTER ================= */}
            <footer className="w-full mt-20 border-t border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-white/70 text-center md:text-left">
                            © {new Date().getFullYear()} Pratham. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-white/70">
                            <a href="/contact" className="hover:text-white transition">
                                Contact
                            </a>
                            <a href="/docs/overview" className="hover:text-white transition">
                                Docs
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}