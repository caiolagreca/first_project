import { ChallengeFormModel, ChallengeModel, RequestUserModel } from "../../models";
import { Challenge, ChallengeDomain } from "./challenge.domain";

export class ChallengeRepository {

  constructor(user: RequestUserModel) {
    console.log({ user });
  }

  create = async (data: ChallengeFormModel): Promise<ChallengeModel> => {
    return Challenge.create(data);
  };

  findAll = async (): Promise<ChallengeModel[]> => {
            console.log({ response: 123 })
    
    return Challenge.find({});
  };

  findById = async (id: string): Promise<ChallengeModel | null> => {
    return Challenge.findById(id);
  };

  update = async (id: string, data: Partial<ChallengeFormModel>): Promise<ChallengeModel | null> => {
    return Challenge.findByIdAndUpdate(id, data, { new: true });
  };

  delete = async (id: string): Promise<ChallengeModel | null> => {
    return Challenge.findByIdAndDelete(id);
  };
}
