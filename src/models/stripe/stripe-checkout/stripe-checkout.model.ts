import { ObjectId } from "mongoose";

export interface StripeCheckoutModel {
  _id: ObjectId;
  success_url: string;
  url: string;
}
