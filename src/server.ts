import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { connectDatabase } from "./config/database"

import cors from "cors";
app.use(cors({
  origin: "https://insightboard-backend-57ed.vercel.app/",
}));

const PORT = 3000;
const startServer = async () => {

  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

startServer();
