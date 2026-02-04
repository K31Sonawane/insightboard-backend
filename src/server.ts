import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { connectDatabase } from "./config/database"


 console.log("Starting server.111..");
const PORT = 3000;
  console.log("Starting server...");
const startServer = async () => {

  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

startServer();
