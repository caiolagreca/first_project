import { model, Schema } from "mongoose";

export interface IDomain extends Document {
  id: string;
  currency: string;
  unit_amount: number;
  product_data: {
    name: string;
  };
}

const schema = new Schema<IDomain>({
  currency: {
    type: String,
    required: [true, "Currency is required"],
  },
  unit_amount: {
    type: Number,
    required: [true, "Currency is required"],
  },
  product_data: {
    type: Object,
    required: [true, "Currency is required"],
  },
});

export const domain = model<IDomain>("stripe-price", schema);
