import { ObjectId } from "mongoose";

export interface StripeProductModel {
  _id: ObjectId;
  name: string;
  active: boolean;
  description?: string;
}
