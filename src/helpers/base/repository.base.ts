import { RequestUserModel } from "../../models";

export class RepositoryBase {

    protected user: RequestUserModel

    constructor(user: RequestUserModel) {
        this.user = user;
    }
}
