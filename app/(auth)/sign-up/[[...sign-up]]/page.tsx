import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

const REDIRECT_URL = "/home";

export default function SignUpPage() {
  return (
    <div className="p-2 sm:p-20 min-h-screen relative flex items-center justify-center overflow-hidden bg-background">

      {/* Background glow */}
      <div className="absolute -inset-[30%] bg-[radial-gradient(circle_at_20%_20%,hsl(217,91%,60%),transparent_40%)] opacity-30 animate-wave-slow" />
      <div className="absolute -inset-[30%] bg-[radial-gradient(circle_at_80%_30%,hsl(200,90%,65%),transparent_40%)] opacity-20 animate-wave-medium" />

      {/* Glass card */}
      <div
        className="relative z-10 w-full max-w-md mx-4 p-6 sm:p-8 rounded-2xl 
        bg-white/10 dark:bg-black/30 backdrop-blur-2xl 
        border border-white/15 shadow-xl"
      >
        {/* Brand */}
        {/* <div className="mb-6 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">
            EASYUPLOADS
          </h1>
          <p className="mt-1 text-xs sm:text-sm opacity-70">
            Fast and predictable media workflows
          </p>
        </div> */}

        {/* Clerk Sign Up */}
        <div className="flex justify-center">
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            forceRedirectUrl={REDIRECT_URL}
            fallbackRedirectUrl={REDIRECT_URL}
            appearance={{
              variables: {
                colorPrimary: "hsl(217, 91%, 60%)",
                colorBackground: "transparent",
                colorInputBackground: "rgba(255,255,255,0.06)",
                colorInputText: "hsl(0, 0%, 98%)",
                colorText: "hsl(0, 0%, 98%)",
                colorTextSecondary: "hsl(215, 20%, 75%)",
                colorDanger: "hsl(0, 84%, 60%)",
                borderRadius: "0.75rem",
                fontFamily: "inherit",
              },

              elements: {
                card: "bg-transparent shadow-none p-0",
                header: "hidden",
                footer: "mt-6",
                dividerLine: "bg-white/10",
                dividerText: "text-white/40",

                socialButtonsBlockButton:
                  "bg-white/5 hover:bg-white/10 border border-white/10 text-white transition",

                formFieldInput:
                  "bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary/40",

                formFieldLabel: "text-white/70",

                formButtonPrimary:
                  "bg-primary hover:bg-primary/90 text-primary-foreground font-medium",

                footerActionText: "text-white/50",
                footerActionLink:
                  "text-primary hover:text-primary/80 font-medium",

                identityPreviewText: "text-white",
                identityPreviewEditButton:
                  "text-primary hover:text-primary/80",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
