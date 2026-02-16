import { RepositoryBase } from "../../../helpers";
import { StripeProductFormModel } from "../../../models/stripe/stripe-products/stripe-products-form.model";
import { StripeProductModel } from "../../../models/stripe/stripe-products/stripe-products.model";
import { Domain, IDomain } from "./stripe-products.domain";

export class Repository extends RepositoryBase<IDomain> {
  constructor() {
    super(Domain);
  }

  updateById = async (
    id: String,
    data: Partial<StripeProductFormModel>,
  ): Promise<StripeProductModel | undefined> => {
    const filter = {
      _id: id,
    };

    const product = await this.findOneAndUpdate<StripeProductModel>(
      filter,
      data,
      { new: true },
    );

    return product;
  };

  deleteById = async (id: String): Promise<boolean> => {
    const filter = {
      _id: id,
    };

    const result = await this.deleteOne(filter);

    return result.deletedCount > 0;
  };
}
