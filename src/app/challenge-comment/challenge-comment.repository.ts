import { RepositoryBase } from "../../helpers";
import { ChallengeCommentFormModel } from "../../models/challenge-comments/challenge-comments-form.model";
import { ChallengeCommentModel } from "../../models/challenge-comments/challenge-comments.model";
import { Domain, IDomain } from "./challenge-comment.domain";

export class Repository extends RepositoryBase<IDomain> {
  constructor() {
    super(Domain);
  }

  updateById = async (
    id: String,
    data: Partial<ChallengeCommentFormModel>,
  ): Promise<ChallengeCommentModel | undefined> => {
    const filter = {
      _id: id,
    };

    const challengeComment = await this.findOneAndUpdate<ChallengeCommentModel>(
      filter,
      data,
      {
        new: true,
      },
    );

    return challengeComment;
  };

  deleteById = async (id: String): Promise<boolean> => {
    const filter = {
      _id: id,
    };

    const result = await this.deleteOne(filter);
    
    return result.deletedCount > 0;
  };
}
