import Stripe from "stripe";

export class StripeWebhookApp {
  webhook = async (rawBody: Buffer, signature: string | undefined) => {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) throw new Error("Missing STRIPE_SECRET_KEY");

    const stripe = new Stripe(apiKey, { apiVersion: "2026-01-28.clover" });

    const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET_KEY;
    if (!endpointSecret)
      throw new Error("Missing STRIPE_WEBHOOK_ENDPOINT_SECRET_KEY");

    if (!signature) throw new Error("Missing Stripe signature header");

    try {
      const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        endpointSecret,
      );
      console.log(`event received: ${JSON.stringify(event, null, 2)}`);

      if (event.type === "customer.created") {
        const customer = await stripe.customers.retrieve(event.data.object.id);
        return { received: true, eventType: event.type, customer };
      }
      return { received: true, eventType: event.type };
    } catch (error) {
      console.log(`Webhook signature verification failed: ${error}`);
    }
  };
}
