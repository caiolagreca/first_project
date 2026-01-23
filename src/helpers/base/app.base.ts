import fs from "fs";
import path from "path";
import { RequestConfigModel, RequestUserModel } from "../../models";

export class AppBase<R> {

    public repository: R;
    public user: RequestUserModel;
    public config: RequestConfigModel;

    constructor(domain: string, user: RequestUserModel, config: RequestConfigModel) {

        this.user = user;
        this.config = config;

        const filePath = `${process.cwd()}/dist/app/${domain}/${domain}.repository`;
        const module = require(filePath);
        
        // Handle both default export and named export
        const RepositoryClass = module.default || module[`${domain.charAt(0).toUpperCase() + domain.slice(1)}Repository`] || Object.values(module)[0];
        
        this.repository = new (RepositoryClass as any)(this.user) as R;
    }

}