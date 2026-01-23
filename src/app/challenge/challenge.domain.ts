import mongoose from "mongoose";
const { Schema } = mongoose;

export interface ChallengeDomain {
  name: string;
  date: Date;
}

const challengeSchema = new Schema<ChallengeDomain>({
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    date: Date
});

export const Challenge = mongoose.model("Challenge", challengeSchema);
