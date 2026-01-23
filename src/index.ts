import dotenv from "dotenv";
import { dbConnect } from "./config/db-connect";
import express from "express";
import routerInit from "./routes";
import { resolveToken } from "./middleware/resolve-token";

dotenv.config();

const app = express();

// Middleware
// app.use(express.json());

// Server
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    
    await dbConnect();
    
    app.use(resolveToken);

    routerInit(app);

    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server: ", err);
    process.exit(1);
  }
};
start();
