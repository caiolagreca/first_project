import { AppBase } from "../../helpers";
import {
  ChallengeFormModel,
  ChallengeModel,
  SessionConfigModel,
  SessionUserModel,
} from "../../models";
import {
  ChallengeCommentFormModel,
  ChallengeCommentModel,
} from "../../models/challenge-comments";
import { Repository } from "./challenge-comment.repository";

export class ChallengeCommentApp extends AppBase<Repository> {
  constructor(user: SessionUserModel, config?: SessionConfigModel) {
    super(Repository, user, config);
  }

  create = async (
    data: ChallengeCommentFormModel,
  ): Promise<ChallengeCommentModel> => {
    const challengeComment =
      await this.repository.create<ChallengeCommentModel>(data);

    return challengeComment;
  };

  getAll = async (): Promise<ChallengeCommentModel[]> => {
    const challengeComments = await this.repository.find<ChallengeCommentModel>(
      {},
    );

    return challengeComments;
  };

  getById = async (id: string): Promise<ChallengeCommentModel | undefined> => {
    const challengeComment =
      await this.repository.findById<ChallengeCommentModel>(id);

    return challengeComment;
  };

  update = async (
    id: string,
    data: Partial<ChallengeCommentFormModel>,
  ): Promise<ChallengeCommentModel | undefined> => {
    const challengeComment = await this.repository.updateById(id, data);

    return challengeComment;
  };

  delete = async (id: string): Promise<boolean> => {
    const hasDeleted = await this.repository.deleteById(id);

    return hasDeleted;
  };
}
