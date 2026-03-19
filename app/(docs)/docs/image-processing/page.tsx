 "use client";
 
 export default function ImageProcessingPage() {
   return (
     <div className="space-y-12">
       <div>
         <h1 className="text-3xl sm:text-4xl font-bold mb-4">Image Processing</h1>
         <p className="text-white/70 text-lg max-w-2xl">
           Apply effects and filters, resize and crop images, and export in social-ready aspect ratios with instant previews.
         </p>
       </div>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">Tools Included</h2>
         <div className="grid sm:grid-cols-2 gap-6">
           <div className="p-5 rounded-xl bg-white/5 border border-white/10">
             <h3 className="font-semibold mb-2">Effects & Filters</h3>
             <p className="text-sm text-white/70">Curated artistic filters and effects at /add-effects.</p>
           </div>
           <div className="p-5 rounded-xl bg-white/5 border border-white/10">
             <h3 className="font-semibold mb-2">Social Aspect Ratios</h3>
             <p className="text-sm text-white/70">Presets for Instagram, Twitter/X, Facebook at /social-share.</p>
           </div>
         </div>
       </section>
 
       <section className="space-y-6">
         <h2 className="text-2xl font-semibold">How To Use In App</h2>
         <div className="space-y-3 text-white/70 text-sm">
           <p>Effects & Filters (/add-effects)</p>
           <ul className="list-disc ml-6 space-y-1">
             <li>Upload an image</li>
             <li>Select a filter and effect; preview updates instantly</li>
             <li>Download the transformed image</li>
           </ul>
           <p className="mt-4">Social Aspect Ratios (/social-share)</p>
           <ul className="list-disc ml-6 space-y-1">
             <li>Upload an image</li>
             <li>Pick a social format (1:1, 16:9, etc.)</li>
             <li>Download a perfectly sized asset</li>
           </ul>
         </div>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">API Quickstart</h2>
         <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-sm text-white/80">
{`POST /api/image-upload

FormData:
  file: <binary image>`}
         </div>
       </section>
 
       <section className="space-y-3">
         <h2 className="text-2xl font-semibold">Tips & Limits</h2>
         <ul className="space-y-2 text-white/70 text-sm">
           <li>• Max image resolution: 25 Megapixels</li>
           <li>• Plan limits apply per your subscription</li>
           <li>• Supported formats: JPEG, PNG, WebP</li>
         </ul>
       </section>
     </div>
   );
 }
