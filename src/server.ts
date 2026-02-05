import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import app from "./app";
import { connectDatabase } from "./config/database";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDatabase();
    console.log("✅ MongoDB connected");

    app.use(
      cors({
        origin: "https://insightboard-frontend-idaf.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      })
    );

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
  }
}

startServer();
