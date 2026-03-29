import mongoose, { Document, model, Schema, Types } from "mongoose";
// properties: userId, date, text
// challengeId como pai, userId, text

export interface IDomain extends Document {
  text: string;
  userId: Types.ObjectId;
  date?: Date;
  challengeId: Types.ObjectId;
}

const schema = new Schema<IDomain>({
  text: { type: String, required: [true, "Comment is required"] },
  userId: Types.ObjectId,
  date: {
    type: Date,
    default: Date,
  },
  challengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "challenge",
    required: [true, "ChallengeId is required"],
  },
});

export const Domain = model<IDomain>("challenge-comment", schema);
