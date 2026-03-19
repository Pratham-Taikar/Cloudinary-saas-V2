 "use client";
 
 export default function DashboardDocPage() {
   return (
     <div className="space-y-12">
       <div>
         <h1 className="text-3xl sm:text-4xl font-bold mb-4">Dashboard</h1>
         <p className="text-white/70 text-lg max-w-2xl">
           The user dashboard gives visibility into your plan, usage counters, and upgrade options.
         </p>
       </div>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">What You See</h2>
         <ul className="list-disc ml-6 space-y-2 text-white/70 text-sm">
           <li>Current plan and benefits</li>
           <li>Image and video usage counts</li>
           <li>Next available upgrade path</li>
         </ul>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">Where to Find It</h2>
         <p className="text-sm text-white/70">
           Access the dashboard at /user-dashboard when signed in.
         </p>
       </section>
     </div>
   );
 }
