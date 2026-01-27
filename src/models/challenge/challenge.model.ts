import { ObjectId } from "mongoose";

export interface ChallengeModel {
    _id: ObjectId;
    name: string;
    date?: Date;
}
