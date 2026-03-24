import { IUser } from "@/models/user.models";
import dayjs from "dayjs";

/**
 * Validates and resets user subscription credits if a billing cycle has passed.
 * Also downgrades to free plan if premium plan has expired without renewal.
 * 
 * @param user The user document to check
 * @returns true if the user document was modified, false otherwise
 */
export async function checkAndResetSubscription(user: IUser): Promise<boolean> {
  const now = dayjs();
  const lastBilling = dayjs(user.lastBillingDate);
  
  let modified = false;

  // 1. Check for monthly credit reset (30 days cycle)
  if (now.diff(lastBilling, 'day') >= 30) {
    user.imageCount = 0;
    user.videoCount = 0;
    user.lastBillingDate = now.toDate();
    modified = true;
  }

  // 2. Check for plan expiry (only for premium plans)
  if (user.plan !== "free" && user.planExpiry) {
    const expiry = dayjs(user.planExpiry);
    
    if (now.isAfter(expiry)) {
      user.plan = "free";
      user.planExpiry = undefined; // Clear expiry for free plan
      modified = true;
    }
  }

  if (modified) {
    await user.save();
  }

  return modified;
}
