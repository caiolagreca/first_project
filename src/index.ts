import dotenv from "dotenv";
import { dbConnect } from "./config/db-connect";
import express from "express";
import routerInit from "./routes";
import { globalErrorHandler, resolveToken } from "./helpers/middleware";
import path from "node:path";
import bodyParser from "body-parser";
import { setupSwagger, generateSwaggerFile } from "./helpers/swagger.helper";
import { stripeWebhookRouter } from "./routes/p1";

dotenv.config();

const app = express();

// Middleware
// app.use(express.json());

// Server
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await dbConnect();

    app.use("/p1/stripe-webhooks", stripeWebhookRouter);
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, "client")));

    // Setup Swagger documentation BEFORE routes
    setupSwagger(app);

    app.use(resolveToken());

    routerInit(app);

    app.use(globalErrorHandler);

    // Generate Swagger JSON file (optional)
    generateSwaggerFile();

    app.listen(PORT, () => {
      console.info(`Server is running at ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server: ", err);
    process.exit(1);
  }
};
start();
