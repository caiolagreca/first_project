import { UserBase } from "../../../helpers";
import { SessionConfigModel, SessionUserModel } from "../../../models";
import {
  StripeCheckoutFormModel,
  StripeCheckoutModel,
} from "../../../models/stripe/stripe-checkout";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export class StripeCheckoutApp extends UserBase {
  constructor(user: SessionUserModel, config: SessionConfigModel) {
    super(user, config);
  }

  checkout = async (
    data: StripeCheckoutFormModel,
  ): Promise<StripeCheckoutModel> => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: data.line_items[0].price,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/stripe-success.html`,
    });
    return session;
  };
}
