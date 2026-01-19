import { Challenge, ChallengeDomain } from "./challenge.domain";

export class ChallengeRepository {
  create = async (data: Partial<ChallengeDomain>) => {
    return Challenge.create(data);
  };

  findAll = async () => {
    return Challenge.find({});
  };

  findById = async (id: string) => {
    return Challenge.findById(id);
  };

  update = async (id: string, data: Partial<ChallengeDomain>) => {
    return Challenge.findByIdAndUpdate(id, data, { new: true });
  };

  delete = async (id: string) => {
    return Challenge.findByIdAndDelete(id);
  };
}
