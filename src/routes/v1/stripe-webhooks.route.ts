import express from "express";
import { ExpressRequest, ExpressResponse } from "../../models";
import { StripeWebhookApp } from "../../app/stripe/stripe-webhooks/stripe-webhooks.app";
import { HttpResponse } from "../../helpers";

export const stripeWebhookRouter = express.Router();

stripeWebhookRouter.use((_, res: ExpressResponse<StripeWebhookApp>, next) => {
  res.locals.app = new StripeWebhookApp(res.locals.user, res.locals.config);
  next();
});

stripeWebhookRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req: ExpressRequest, res: ExpressResponse<StripeWebhookApp>) => {
    res.locals.app
      .webhook(req.body)
      .then((response) => {
        HttpResponse.ok(response)(req, res);
      })
      .catch((error) => {
        HttpResponse.error(error)(req, res);
      });
  },
);
