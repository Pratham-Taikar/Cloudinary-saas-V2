 "use client";
 
 export default function ImageAspectRatiosPage() {
   return (
     <div className="space-y-12">
       <div>
         <h1 className="text-3xl sm:text-4xl font-bold mb-4">Image Aspect Ratios</h1>
         <p className="text-white/70 text-lg max-w-2xl">
           Export perfectly sized images for social platforms using presets with instant preview.
         </p>
       </div>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">How To Use In App</h2>
         <ul className="list-disc ml-6 space-y-2 text-white/70 text-sm">
           <li>Go to /social-share</li>
           <li>Upload an image</li>
           <li>Select a preset (e.g., Instagram 1:1, Twitter 16:9)</li>
           <li>Download the resized output</li>
         </ul>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">Presets</h2>
         <ul className="space-y-2 text-white/70 text-sm">
           <li>• Instagram Square: 1080×1080 (1:1)</li>
           <li>• Instagram Portrait: 1080×1350 (4:5)</li>
           <li>• Twitter Post: 1200×675 (16:9)</li>
           <li>• Twitter Header: 1500×500 (3:1)</li>
           <li>• Facebook Cover: 820×312 (≈205:78)</li>
         </ul>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">API Quickstart</h2>
         <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-sm text-white/80">
{`// Client render with next-cloudinary
<CldImage
  src="<public_id>"
  width={1080}
  height={1080}
  crop="fill"
  aspectRatio="1:1"
  gravity="auto"
/>`}
         </div>
       </section>
 
       <section className="space-y-3">
         <h2 className="text-2xl font-semibold">Notes & Limits</h2>
         <ul className="space-y-2 text-white/70 text-sm">
           <li>• Max image resolution: 25 Megapixels</li>
           <li>• Plan limits apply to total images processed</li>
         </ul>
       </section>
     </div>
   );
 }
