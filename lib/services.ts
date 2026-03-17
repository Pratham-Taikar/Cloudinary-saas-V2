export type PlanKey = "free" | "elite" | "mega";

export interface PlanConfig {
  name: string;
  videoLimit: number;
  imageLimit: number;
  price: number;
}

const services: Record<PlanKey, PlanConfig> = {
  free: {
    name: "Free",
    videoLimit: 3,
    imageLimit: 10,
    price: 0,
  },
  elite: {
    name: "Elite",
    videoLimit: 20,
    imageLimit: 75,
    price: 149,
  },
  mega: {
    name: "Mega",
    videoLimit: 50,
    imageLimit: 250,
    price: 399,
  },
};

/**
 * Returns the ordered list of plan keys from lowest to highest tier.
 */
export const planOrder: PlanKey[] = ["free", "elite", "mega"];

/**
 * Given the current plan key, returns the next upgrade plan key (or null if already on highest).
 */
export function getNextPlan(current: PlanKey): PlanKey | null {
  const idx = planOrder.indexOf(current);
  if (idx === -1 || idx >= planOrder.length - 1) return null;
  return planOrder[idx + 1];
}

export default services;