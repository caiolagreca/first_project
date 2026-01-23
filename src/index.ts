import dotenv from "dotenv";
import { dbConnect } from "./config/db-connect";
import express from "express";
import { challengePublicRoutes } from "./routes/p1";
import { challengePrivateRoutes } from "./routes/v1";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/challenges", challengePublicRoutes);
app.use("/api/challenges", challengePrivateRoutes);

// Server
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server: ", err);
    process.exit(1);
  }
};
start();
