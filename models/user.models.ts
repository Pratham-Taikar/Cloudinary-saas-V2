import mongoose, { Schema, Document, Model } from "mongoose";
import type { PlanKey } from "@/lib/services";

export interface IUser extends Document {
  userId: string;
  username?: string;
  email: string;
  avatarUrl?: string;
  imageCount: number;
  videoCount: number;
  plan: PlanKey;
  lastBillingDate: Date;
  planExpiry?: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    userId:{
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    imageCount: {
      type: Number,
      default: 0,
    },
    videoCount: {
      type: Number,
      default: 0,
    },
    plan: {
      type: String,
      enum: ["free", "elite", "mega"],
      default: "free",
    },
    lastBillingDate: {
      type: Date,
      default: Date.now,
    },
    planExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;