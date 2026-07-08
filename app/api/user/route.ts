import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import connectDB, { getDatabaseErrorMessage } from "@/lib/db";
import User from "@/models/user.models";
import { checkAndResetSubscription } from "@/lib/subscription";

export async function GET() {
  try {
    const { userId } = await auth();
    const clerkUser = await currentUser();

    if (!userId || !clerkUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    let user = await User.findOne({ userId });

    if (!user) {
      user = await User.create({
        userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        username: clerkUser.username || clerkUser.firstName || "",
        avatarUrl: clerkUser.imageUrl,
        imageCount: 0,
        videoCount: 0,
        plan: "free",
        lastBillingDate: new Date(),
      });
    } else {
      // Check and reset subscription credits/plan if needed
      await checkAndResetSubscription(user);
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch or create user",
        details: getDatabaseErrorMessage(error),
      },
      { status: 503 }
    );
  }
}
