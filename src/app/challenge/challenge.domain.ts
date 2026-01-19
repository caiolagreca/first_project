import mongoose from "mongoose";
const { Schema } = mongoose;

export interface ChallengeDomain {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

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
