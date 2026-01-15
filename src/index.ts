import dotenv from "dotenv";
// @ts-ignore
import dbConnect from "./config/dbConnect";
import express from "express";
import { challengeRoutes } from "./routes/p1";

dotenv.config();

const app = express();

dbConnect();

app.use(express.json());

app.use("/api/challenges", challengeRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
