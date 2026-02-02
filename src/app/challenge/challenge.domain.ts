import { Document, model, Schema, Types } from "mongoose";

export interface IDomain extends Document {
  name: string;
  userId: string;
  date?: Date;
}

const schema = new Schema<IDomain>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  userId: Types.ObjectId,
  date: {
    type: Date,
    default: Date,
  },
});

export const Domain = model<IDomain>("challenge", schema);
