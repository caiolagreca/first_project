import { UserBase } from "../../../helpers";
import { SessionConfigModel, SessionUserModel } from "../../../models";
import { StripePriceFormModel } from "../../../models/stripe/stripe-prices/stripe-prices-form.model";
import { StripePriceModel } from "../../../models/stripe/stripe-prices/stripe-prices.model";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export class StripePriceApp extends UserBase {
  constructor(user: SessionUserModel, config: SessionConfigModel) {
    super(user, config);
  }

  create = async (data: StripePriceFormModel): Promise<StripePriceModel> => {
    const price = await stripe.prices.create({
      currency: data.currency,
      unit_amount: data.unit_amount,
      product_data: {
        name: data.product_data.name,
      },
    });
    console.log(price);
    return price;
  };
}
