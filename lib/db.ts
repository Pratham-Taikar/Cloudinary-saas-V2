import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL;

const mongooseCache = (global as typeof globalThis & {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}).mongoose;

let cached = mongooseCache ?? { conn: null, promise: null };

if (!mongooseCache) {
  (global as typeof globalThis & {
    mongoose: {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    };
  }).mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    throw new Error(
      "Missing MongoDB connection string. Set MONGODB_URI or DATABASE_URL in your environment."
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

export function getDatabaseErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unknown database error";
}

export default connectDB;
