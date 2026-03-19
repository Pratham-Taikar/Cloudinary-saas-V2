 "use client";
 
 export default function AuthenticationDocPage() {
   return (
     <div className="space-y-12">
       <div>
         <h1 className="text-3xl sm:text-4xl font-bold mb-4">Authentication</h1>
         <p className="text-white/70 text-lg max-w-2xl">
           Authentication is powered by Clerk. Sign in and sign up flows are integrated with custom theming and secure session handling.
         </p>
       </div>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">User Flows</h2>
         <ul className="list-disc ml-6 space-y-2 text-white/70 text-sm">
           <li>Sign In: /sign-in</li>
           <li>Sign Up: /sign-up</li>
         </ul>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">Protected APIs</h2>
         <p className="text-sm text-white/70">
           All upload endpoints require an authenticated session. The server verifies the user with Clerk and associates usage with your account.
         </p>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">Appearance</h2>
         <p className="text-sm text-white/70">
           The auth pages use custom appearance variables for branding and a glass effect layout.
         </p>
       </section>
     </div>
   );
 }
