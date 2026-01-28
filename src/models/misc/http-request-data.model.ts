import { Request, Response } from "express";
import { SessionConfigModel, SessionUserModel } from "../session";

export interface IHttpRequestDataModel<A, O> {
    user: SessionUserModel;
    config: SessionConfigModel;
    app: A;
    orch: O;
}


export interface ExpressRequest<A = any, O = any> extends Request<any, any, any, any, IHttpRequestDataModel<A, O>> {

}

export interface ExpressResponse<A = any, O = any> extends Response<any, IHttpRequestDataModel<A, O>> {

}
