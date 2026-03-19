 "use client";
 
 export default function BillingUpgradesDocPage() {
   return (
     <div className="space-y-12">
       <div>
         <h1 className="text-3xl sm:text-4xl font-bold mb-4">Billing & Upgrades</h1>
         <p className="text-white/70 text-lg max-w-2xl">
           Compare plans and upgrade to increase your processing limits. Changes take effect immediately.
         </p>
       </div>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">Plans Overview</h2>
         <ul className="space-y-2 text-white/70 text-sm">
           <li>• Free — Images: 10, Videos: 3</li>
           <li>• Elite — Images: 75, Videos: 20</li>
           <li>• Mega — Images: 250, Videos: 50</li>
         </ul>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">Upgrade Flow</h2>
         <p className="text-sm text-white/70">
           Visit /billings to view pricing and switch plans. Your next plan option is suggested based on current usage.
         </p>
       </section>
     </div>
   );
 }
