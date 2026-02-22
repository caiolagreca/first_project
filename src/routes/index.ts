import { Express } from "express";
import fs from "fs";
import path from "path";

const init = (app: Express) => {
  const routeFolders = ["p1", "v1"];

  routeFolders.forEach((folder) => {
    const folderPath = path.join(__dirname, folder);

    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);

      files.forEach((file) => {
        if (file.endsWith(".route.ts") || file.endsWith(".route.js")) {
          const routeName = file.replace(/\.route\.(ts|js)$/, "");
          const routePath = `/${folder}/${routeName.toLowerCase()}`;
          const routeModule = require(path.join(folderPath, file));

          const router =
            routeModule.challengeRouter ||
            routeModule.challengeCommentRouter ||
            routeModule.googleRouter ||
            routeModule.stripeProductRouter ||
            routeModule.stripeCheckoutRouter ||
            routeModule.stripePriceRouter;
          if (router) {
            app.use(routePath, router);
            console.info(`✓ Registered route: ${routePath}`);
          }
        }
      });
    }
  });
};

export default init;
