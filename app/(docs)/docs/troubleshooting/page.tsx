 "use client";
 
 export default function TroubleshootingDocPage() {
   return (
     <div className="space-y-12">
       <div>
         <h1 className="text-3xl sm:text-4xl font-bold mb-4">Troubleshooting</h1>
         <p className="text-white/70 text-lg max-w-2xl">
           Common issues and solutions when using the platform.
         </p>
       </div>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">Unauthorized Uploads</h2>
         <p className="text-sm text-white/70">
           Ensure you are signed in via Clerk and your session is active. Upload routes require authentication.
         </p>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">Limit Reached</h2>
         <p className="text-sm text-white/70">
           If you hit plan limits, upgrade at /billings or wait for quota reset. The UI displays a limit reached screen when exhausted.
         </p>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">Image Too Large</h2>
         <p className="text-sm text-white/70">
           Maximum allowed resolution is 25 Megapixels for images. Use a smaller image and try again.
         </p>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">Cloudinary Config</h2>
         <p className="text-sm text-white/70">
           Verify your Cloudinary environment variables are set. Missing keys result in a 500 error on upload.
         </p>
       </section>
     </div>
   );
 }
