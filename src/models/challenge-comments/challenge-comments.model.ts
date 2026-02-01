import { ObjectId } from "mongoose";

export interface ChallengeCommentModel {
  _id: ObjectId;
  text: string;
  userId?: string;
  date?: Date;
  challengeId?: string;
}
