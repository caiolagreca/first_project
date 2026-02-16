import { AppBase } from "../../../helpers";
import { SessionConfigModel, SessionUserModel } from "../../../models";
import {
  StripeProductFormModel,
  StripeProductModel,
} from "../../../models/stripe/stripe-products";
import { Repository } from "./stripe-products.repository";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export class StripeProductApp extends AppBase<Repository> {
  constructor(user: SessionUserModel, config?: SessionConfigModel) {
    super(Repository, user, config);
  }

  create = async (
    data: StripeProductFormModel,
  ): Promise<StripeProductModel> => {
    const product = await stripe.products.create({
      name: data.name,
      description: data.description,
      active: data.active,
    });
    console.log(product);
    return product;
  };
}
