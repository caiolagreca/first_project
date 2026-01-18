import mongoose from "mongoose";
const { Schema } = mongoose;

const challengeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Challenge = mongoose.model("Challenges", challengeSchema);
