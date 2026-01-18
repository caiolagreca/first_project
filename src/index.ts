import dotenv from "dotenv";
// @ts-ignore
import dbConnect from "./config/dbConnect";
import express from "express";
import { challengePublicRoutes } from "./routes/p1";
import { challengePrivateRoutes } from "./routes/v1";

dotenv.config();

const app = express();

dbConnect();

app.use(express.json());

app.use("/api/challenges", challengePublicRoutes);
app.use("/api/challenges", challengePrivateRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
