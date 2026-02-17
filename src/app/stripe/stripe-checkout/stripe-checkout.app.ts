import { UserBase } from "../../../helpers";
import { SessionConfigModel, SessionUserModel } from "../../../models";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export class StripeCheckoutApp extends UserBase {
  constructor(user: SessionUserModel, config: SessionConfigModel) {
    super(user, config);
  }

  checkout = async () => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "prod_TztmurPeYRTRmk",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/success.html`,
    });
  };
}
