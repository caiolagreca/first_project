import { UserBase } from "../../../helpers";
import { SessionConfigModel, SessionUserModel } from "../../../models";
import Stripe from "stripe";

export class StripeWebhookApp extends UserBase {
  constructor(user: SessionUserModel, config: SessionConfigModel) {
    super(user, config);
  }

  webhook = async (
    rawBody: Buffer,
    signature: string | undefined,
    res: any,
  ) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2026-01-28.clover",
    });
    const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET_KEY;

    if (!signature) {
      return res.status(400).json({ error: "Missing Stripe-Signature header" });
    }

    if (!endpointSecret) {
      return res.status(500).json({ error: "Missing webhook endpoint secret" });
    }

    try {
      const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        endpointSecret,
      );
      console.log(`event received: ${event}`);

      if (event.type === "customer.created") {
        const customer = await stripe.customers.retrieve(event.data.object.id);
        console.log("customer retrieved: ", customer);
      } else {
        console.log("unhandled event", event.type);
      }
      res.status(200).json({ received: true });
    } catch (error) {
      console.log(`Webhook signature verification failed: ${error}`);
    }
  };
}
