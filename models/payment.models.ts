import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPayment extends Document {
  userId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  amount: number;
  plan: string;
  status: "success" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema: Schema<IPayment> = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
    },
  },
  { timestamps: true }
);

const PaymentHistory: Model<IPayment> =
  mongoose.models.PaymentHistory || mongoose.model<IPayment>("PaymentHistory", paymentSchema);

export default PaymentHistory;
