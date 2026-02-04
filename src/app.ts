import express from "express";
import graphRoutes from "./routes/graph.routes";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("InsightBoard API is running 🚀");
});
app.use("/api/graph", graphRoutes);

export default app;
