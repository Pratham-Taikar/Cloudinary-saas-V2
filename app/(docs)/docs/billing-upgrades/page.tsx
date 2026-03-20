"use client";

export default function BillingUpgradesDocPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Billing & Upgrades</h1>
        <p className="text-white/70 text-lg max-w-2xl">
          Manage your subscription, compare plans, and scale your usage as your needs grow.
          Upgrades are applied instantly, allowing uninterrupted access to higher processing limits.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Plans Overview</h2>
        <p className="text-white/70 text-sm">
          EasyUploads offers flexible plans designed for individuals, creators, and teams.
          Choose a plan based on your monthly processing requirements.
        </p>

        <ul className="space-y-3 text-white/70 text-sm">
          <li>
            • <span className="text-white font-medium">Free</span> —
            Ideal for getting started and testing the platform. Includes
            <span className="text-white/90"> 10 image transformations</span> and
            <span className="text-white/90"> 3 video compressions</span> per month.
          </li>

          <li>
            • <span className="text-white font-medium">Elite</span> —
            Designed for regular usage and small-scale workflows. Includes
            <span className="text-white/90"> 75 image transformations</span> and
            <span className="text-white/90"> 20 video compressions</span>.
          </li>
    
          <li>
            • <span className="text-white font-medium">Mega</span> —
            Best suited for heavy usage and production workloads. Includes
            <span className="text-white/90"> 250 image transformations</span> and
            <span className="text-white/90"> 50 video compressions</span>.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Upgrade Flow</h2>
        <p className="text-sm text-white/70">
          Upgrading your plan is simple and takes effect immediately without requiring any additional setup.
        </p>

        <ul className="list-disc ml-6 space-y-2 text-white/70 text-sm">
          <li>Navigate to the <span className="text-white/90">/billings</span> page</li>
          <li>Review available plans and current usage</li>
          <li>Select the plan that fits your requirements</li>
          <li>Confirm the upgrade to unlock increased limits instantly</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When to Upgrade</h2>
        <p className="text-white/70 text-sm">
          Consider upgrading your plan if you encounter any of the following:
        </p>

        <ul className="space-y-2 text-white/70 text-sm">
          <li>• You frequently reach your monthly usage limits</li>
          <li>• You are processing media as part of a production workflow</li>
          <li>• You need faster turnaround with higher capacity</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Important Notes</h2>
        <ul className="space-y-2 text-white/70 text-sm">
          <li>• Plan limits reset at the start of each billing cycle</li>
          <li>• Upgrades are applied immediately after confirmation</li>
          <li>• Downgrades (if available) take effect in the next cycle</li>
          <li>• Usage is tracked per account, not per device</li>
        </ul>
      </section>
    </div>
  );
}