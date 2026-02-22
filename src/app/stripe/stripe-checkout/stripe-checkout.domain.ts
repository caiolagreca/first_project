import { model, Schema } from "mongoose";

export interface IDomain extends Document {
  id: string;
  line_items: [
    {
      price: string;
      quantity: number;
    },
  ];
}

const schema = new Schema<IDomain>({
  line_items: [
    {
      type: Array<Object>,
      required: [true, "Currency is required"],
    },
  ],
});

export const domain = model<IDomain>("stripe-price", schema);
