import express from "express";
import { ExpressRequest, ExpressResponse } from "../../models";
import { HttpResponse } from "../../helpers";
import { StripePriceApp } from "../../app/stripe/stripe-prices";

export const stripePriceRouter = express.Router();

stripePriceRouter.use((_, res: ExpressResponse<StripePriceApp>, next) => {
  res.locals.app = new StripePriceApp(res.locals.user, res.locals.config);
  next();
});

stripePriceRouter.post(
  "/",
  (req: ExpressRequest, res: ExpressResponse<StripePriceApp>) => {
    res.locals.app
      .create(req.body)
      .then((response) => {
        HttpResponse.ok(response)(req, res);
      })
      .catch((error) => {
        HttpResponse.error(error)(req, res);
      });
  },
);
