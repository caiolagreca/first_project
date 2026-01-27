import { Request, Response } from "express";
import { ChallengeRepository } from "./challenge.repository";
import { AppBase } from "../../helpers";
import { ChallengeFormModel, ChallengeModel, RequestConfigModel, RequestUserModel } from "../../models";

export class ChallengeApp extends AppBase<ChallengeRepository> {

    constructor(user: RequestUserModel, config: RequestConfigModel) {
        super('challenge', user, config);
    }

    create = async (data: ChallengeFormModel): Promise<ChallengeModel> => {

        const challenge = await this.repository.create(data);

        return challenge;

    };

    getAll = async (): Promise<ChallengeModel[]> => {
        const challenges = await this.repository.findAll();
        return challenges;
    };

    getById = async (id: string): Promise<ChallengeModel | null> => {
        const challenges = await this.repository.findById(id);
        return challenges;
    };

}
