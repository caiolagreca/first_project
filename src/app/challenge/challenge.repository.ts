import { ObjectId } from "mongodb";
import { ChallengeFormModel, ChallengeModel } from "../../models";
import { Challenge } from "./challenge.domain";
import { RepositoryBase } from "../../helpers";

export class ChallengeRepository extends RepositoryBase {

	create = async (data: ChallengeFormModel): Promise<ChallengeModel> => {

		Object.assign(data, {
			userId: this.user.id
		});

		return Challenge.create(data);
	};

	findAll = async (): Promise<ChallengeModel[]> => {
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
