import { Types } from "mongoose";
import { ChallengeFormModel, ChallengeModel } from "../../models";
import { Domain, IDomain } from "./challenge.domain";
import { RepositoryBase } from "../../helpers";

export class Repository extends RepositoryBase<IDomain> {

	constructor() {
		super(Domain);
	}

	updateById = async (id: String, data: Partial<ChallengeFormModel>): Promise<ChallengeModel | undefined> => {

        const filter = {
            _id: id
        }

        const challenge = await this.findOneAndUpdate<ChallengeModel>(filter, data, { new: true });

		return challenge;
        
	}

	deleteById = async (id: String): Promise<boolean> => {

        const filter = {
            _id: id
        }

        const result = await this.deleteOne(filter);
		
		return result.deletedCount > 0;
        
	}

}
