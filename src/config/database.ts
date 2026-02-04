import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/insightboard";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    process.exit(1);
  }
};
