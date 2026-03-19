 "use client";
 
 export default function PlansLimitsPage() {
   return (
     <div className="space-y-12">
       <div>
         <h1 className="text-3xl sm:text-4xl font-bold mb-4">Plans & Limits</h1>
         <p className="text-white/70 text-lg max-w-2xl">
           Usage limits are enforced at upload time. Upgrade plans to increase your monthly quotas.
         </p>
       </div>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">Current Tiers</h2>
         <ul className="space-y-2 text-white/70 text-sm">
           <li>• Free — Images: 10, Videos: 3</li>
           <li>• Elite — Images: 75, Videos: 20</li>
           <li>• Mega — Images: 250, Videos: 50</li>
         </ul>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">Enforcement</h2>
         <ul className="space-y-2 text-white/70 text-sm">
           <li>• Limits checked on /api/image-upload and /api/video-upload</li>
           <li>• Exceeding limits returns 403 with an upgrade message</li>
           <li>• Counters increment on successful uploads</li>
         </ul>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">Pricing</h2>
         <ul className="space-y-2 text-white/70 text-sm">
           <li>• Free — ₹0</li>
           <li>• Elite — ₹149</li>
           <li>• Mega — ₹399</li>
         </ul>
         <p className="text-white/60 text-sm">Visit /billings to compare and upgrade.</p>
       </section>
     </div>
   );
 }
