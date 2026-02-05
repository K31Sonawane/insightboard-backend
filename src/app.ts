import express from "express";
import graphRoutes from "./routes/graph.routes";

const app = express();

// Global middlewares
app.use(express.json());

// API routes
app.use("/graph", graphRoutes);

// Health check (optional but useful)
app.get("/", (req, res) => {
  res.send("InsightBoard Backend is running 🚀");
});

export default app;
