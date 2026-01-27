import { Types } from "mongoose";
import { ChallengeFormModel, ChallengeModel } from "../../models";
import { Domain, IDomain } from "./challenge.domain";
import { RepositoryBase } from "../../helpers";

export class Repository extends RepositoryBase<IDomain> {

	constructor() {
		super(Domain);
	}
	
}
