import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config/swagger.config";
import fs from "fs";
import path from "path";

/**
 * Setup Swagger UI and API documentation
 * @param app Express application instance
 */
export const setupSwagger = (app: Express): void => {
    // Serve Swagger UI
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: "First Project API Documentation",
        swaggerOptions: {
            persistAuthorization: true,
            displayRequestDuration: true,
            filter: true,
            tryItOutEnabled: true
        }
    }));

    // Serve raw OpenAPI JSON
    app.get("/api-docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.info("✓ Swagger documentation available at /api-docs");
    console.info("✓ OpenAPI JSON spec available at /api-docs.json");
};

/**
 * Generate Swagger JSON file
 * @param outputPath Optional custom output path
 */
export const generateSwaggerFile = (outputPath?: string): void => {
    const defaultPath = path.join(process.cwd(), "swagger.json");
    const filePath = outputPath || defaultPath;

    try {
        fs.writeFileSync(filePath, JSON.stringify(swaggerSpec, null, 2));
        console.info(`✓ Swagger JSON file generated at: ${filePath}`);
    } catch (error) {
        console.error("Failed to generate Swagger file:", error);
        throw error;
    }
};
