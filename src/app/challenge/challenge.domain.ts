import mongoose, { ObjectId } from "mongoose";
const { Schema } = mongoose;

export interface ChallengeDomain {
    _id: ObjectId;
    name: string;
    userId: string;
    date?: Date;
}

const challengeSchema = new Schema<ChallengeDomain>({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    userId: String,
    date: {
        type: Date,
        default: Date
    }
});

export const Challenge = mongoose.model("Challenge", challengeSchema);
