import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVideo extends Document {
  title: string;
  description?: string;
  publicId: string;
  originalSize?: string;
  compressedSize?: string;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}

const videoSchema: Schema<IVideo> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    publicId: {
      type: String,
      required: true,
    },
    originalSize: {
      type: String,
    },
    compressedSize: {
      type: String,
    },
    duration: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Video: Model<IVideo> =
  mongoose.models.Video || mongoose.model<IVideo>("Video", videoSchema);

export default Video;
