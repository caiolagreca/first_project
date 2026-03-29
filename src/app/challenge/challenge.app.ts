import { Repository } from "./challenge.repository";
import { AppBase } from "../../helpers";
import {
  ChallengeFormModel,
  ChallengeModel,
  SessionConfigModel,
  SessionUserModel,
} from "../../models";

export class ChallengeApp extends AppBase<Repository> {
  constructor(user: SessionUserModel, config?: SessionConfigModel) {
    super(Repository, user, config);
  }

  create = async (data: ChallengeFormModel): Promise<ChallengeModel> => {
    const challenge = await this.repository.create<ChallengeModel>(data);

    return challenge;
  };

  getAll = async (): Promise<ChallengeModel[]> => {
    const challenges = await this.repository.find<ChallengeModel>({});

    return challenges;
  };

  getById = async (id: string): Promise<ChallengeModel | undefined> => {
    const challenge = await this.repository.findById<ChallengeModel>(id);

    return challenge;
  };

  update = async (
    id: string,
    data: Partial<ChallengeFormModel>,
  ): Promise<ChallengeModel | undefined> => {
    const challenge = await this.repository.updateById(id, data);

    return challenge;
  };

  delete = async (id: string): Promise<boolean> => {
    const hasDeleted = await this.repository.deleteById(id);

    return hasDeleted;
  };
}
