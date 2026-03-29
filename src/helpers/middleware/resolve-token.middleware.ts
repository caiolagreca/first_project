import { NextFunction } from "express";
import { ExpressRequest, ExpressResponse } from "../../models";

interface PublicPaths {
  method: string;
  path: string;
}

export const resolveToken =
  (exception?: PublicPaths[]) =>
  (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    let error;
    try {
      const { authorization } = req.headers || {};
      const { path, method } = req;

      let requireAuth = true;
      if (path.toLowerCase().startsWith("/p1")) {
        requireAuth = false;
      }

      let user;
      if (authorization) {
        try {
          const userData = JSON.parse(atob(authorization));
          user = userData;
        } catch {}
      } else if (requireAuth) {
        throw new Error("SERVER_AUTH_REQUIRED");
      }

      res.locals.user = user;

      res.locals.config = res.locals.config || {};
      res.locals.config.allowAnnonymous = !Boolean(user);
    } catch (err) {
      error = err;
    }

    next(error);
  };
