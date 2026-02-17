import express from "express";
import { ExpressRequest, ExpressResponse } from "../../models";
import { StripeCheckoutApp } from "../../app/stripe/stripe-checkout";
import { HttpResponse } from "../../helpers";

export const StripeCheckoutRouter = express.Router();

StripeCheckoutRouter.use((_, res: ExpressResponse<StripeCheckoutApp>, next) => {
  res.locals.app = new StripeCheckoutApp(res.locals.user, res.locals.config);
  next();
});

StripeCheckoutRouter.post(
  "/create-checkout-session",
  (req: ExpressRequest, res: ExpressResponse<StripeCheckoutApp>) => {
    res.locals.app
      .checkout()
      .then((response) => {
        HttpResponse.ok(response)(req, res);
      })
      .catch((error) => {
        HttpResponse.error(error)(req, res);
      });
  },
);
