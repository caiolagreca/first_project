import { SessionConfigModel, SessionUserModel } from "../../models";
import { UserBase } from "./user.base";

export class AppBase<R> extends UserBase {

    public repository: R;
    
    constructor(TCreator: { new (): R; }, user: SessionUserModel, config?: SessionConfigModel, data?: { 
        allowAnnonymous?: boolean;
    }) {
        super(user, config, data);
        this.repository = new TCreator();
    }
}
