import express from "express";
import { ExpressRequest, ExpressResponse } from "../../models";
import { StripeCheckoutApp } from "../../app/stripe/stripe-checkout";
import { HttpResponse } from "../../helpers";

export const stripeCheckoutRouter = express.Router();

stripeCheckoutRouter.use((_, res: ExpressResponse<StripeCheckoutApp>, next) => {
  res.locals.app = new StripeCheckoutApp(res.locals.user, res.locals.config);
  next();
});

stripeCheckoutRouter.post(
  "/",
  (req: ExpressRequest, res: ExpressResponse<StripeCheckoutApp>) => {
    res.locals.app
      .checkout(req.body)
      .then((response) => {
        HttpResponse.ok(response)(req, res);
      })
      .catch((error) => {
        HttpResponse.error(error)(req, res);
      });
  },
);
