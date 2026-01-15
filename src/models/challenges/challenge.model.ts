import mongoose from "mongoose";
const { Schema } = mongoose;

const challengeSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

export const Challenge = mongoose.model("Challenges", challengeSchema);
