import { Document, model, Schema } from "mongoose";

export interface IDomain extends Document {
  id: string;
  name: string;
  active: boolean;
  description?: string;
}

const schema = new Schema<IDomain>({
  name: {
    type: String,
    required: [true, "Name is reqired"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
});

export const Domain = model<IDomain>("stripe-product", schema);
