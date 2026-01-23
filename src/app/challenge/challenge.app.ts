import { Request, Response } from "express";
import { ChallengeRepository } from "./challenge.repository";
import { AppBase } from "../../helpers";
import { ChallengeFormModel, ChallengeModel, RequestConfigModel, RequestUserModel } from "../../models";

export class ChallengeApp extends AppBase<ChallengeRepository> {

  constructor(user: RequestUserModel, config: RequestConfigModel) {
    super('challenge', user, config);
  }

  createChallenge = async (data: ChallengeFormModel): Promise<ChallengeModel> => {
      
      const challenge = await this.repository.create(data);

      return challenge;

  };

  getAllChallenges = async (): Promise<ChallengeModel[]> => {
    console.log({ response: 1 })
    console.log(this.repository.findAll);
    const challenges = await this.repository.findAll();
    return challenges;
  };

  getChallengeById = async (id: string): Promise<ChallengeModel | null> => {
    const challenge = await this.repository.findById(id);
    return challenge;
  };

  updateChallenge = async (id: string, data: Partial<ChallengeFormModel>): Promise<ChallengeModel | null> => {
    
    const challenge = await this.repository.update(id, data);

    return challenge;
  };

  deleteChallenge = async (id: string): Promise<ChallengeModel | null> => {
    const challenge = await this.repository.delete(id);

    return challenge;
  };
}
