import { SessionConfigModel, SessionUserModel } from "../../models";

export class UserBase {
    
    private _user: SessionUserModel;
    
    public get user(): SessionUserModel {
        return this._user;
    }

    private _config?: SessionConfigModel;

    public get config(): SessionConfigModel {
        return this._config || {} as SessionConfigModel;
    }

    constructor(user: SessionUserModel, config?: SessionConfigModel, data?: { 
        allowAnnonymous?: boolean;
    }) {

        const allowAnnonymous = data?.allowAnnonymous || config?.allowAnnonymous;
        
        if (!allowAnnonymous && !user) {
            throw new Error('USER_REQUIRED');
        }

        this._user = user;
        if (config)
            this._config = config;
    }
    
    
}
