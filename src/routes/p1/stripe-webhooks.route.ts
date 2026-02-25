import express from "express";
import { ExpressRequest, ExpressResponse } from "../../models";
import { StripeWebhookApp } from "../../app/stripe/stripe-webhooks/stripe-webhooks.app";
import { HttpResponse } from "../../helpers";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const stripeWebhookRouter = express.Router();

stripeWebhookRouter.use((_, res: ExpressResponse<StripeWebhookApp>, next) => {
  res.locals.app = new StripeWebhookApp(res.locals.user, res.locals.config);
  next();
});

stripeWebhookRouter.post(
  "/",
  express.raw({ type: "application/json" }),
  (req: ExpressRequest, res: ExpressResponse<StripeWebhookApp>) => {
    const rawSignature = req.headers["stripe-signature"];
    const signature = Array.isArray(rawSignature)
      ? rawSignature[0]
      : rawSignature;
    res.locals.app
      .webhook(req.body, signature, res)
      .then((response) => {
        HttpResponse.ok(response)(req, res);
      })
      .catch((error) => {
        HttpResponse.error(error)(req, res);
      });
  },
);

/* stripeWebhookRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    let event;
    const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET_KEY;
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret,
        );
      } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }

      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          // Then define and call a method to handle the successful payment intent.
          // handlePaymentIntentSucceeded(paymentIntent);
          break;
        case "payment_method.attached":
          const paymentMethod = event.data.object;
          // Then define and call a method to handle the successful attachment of a PaymentMethod.
          // handlePaymentMethodAttached(paymentMethod);
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    }
    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  },
); */
