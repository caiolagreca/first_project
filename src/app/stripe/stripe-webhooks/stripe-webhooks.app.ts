import { UserBase } from "../../../helpers";
import { SessionConfigModel, SessionUserModel } from "../../../models";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export class StripeWebhookApp extends UserBase {
  constructor(user: SessionUserModel, config: SessionConfigModel) {
    super(user, config);
  }

  webhook = async (data: any) => {
    const signature = data.headers["stripe-signature"];
    try {
      const event = stripe.webhooks.constructEvent(
        data,
        signature,
        process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET_KEY,
      );
      console.log(`event received: ${event}`);

      if (event.type === "customer.created") {
        const customer = await stripe.customer.retrieve(event.data.object.id);
        console.log("customer retrieved: ", customer);
      } else {
        console.log("unhandled event", event.type);
      }
    } catch (error) {
      console.log(
        `⚠️ Webhook signature verification failed.` /* err.message */,
      );
      return data.sendStatus(400);
    }
  };
}
