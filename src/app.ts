import express from "express";
import graphRoutes from "./routes/graph.routes";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://insightboard-frontend-idaf.vercel.app/", // frontend URL
}));
app.get("/", (req, res) => {
  res.send("InsightBoard API is running 🚀");
});
app.use("/api/graph", graphRoutes);

export default app;
