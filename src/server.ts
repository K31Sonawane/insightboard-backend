// server.ts
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import app from "./app"; // your existing app with routes
import { connectDatabase } from "./config/database";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();
    console.log("✅ Database connected");

    // CORS setup: allow only frontend domain
    app.use(cors({
      origin: "https://insightboard-frontend-idaf.vercel.app", // no trailing slash
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    }));

    // Parse JSON requests
    app.use(express.json());

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
