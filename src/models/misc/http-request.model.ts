import { Request, Response } from "express";
import { RequestConfigModel, RequestUserModel } from "../request";

export interface IHttpRequestData<A, O> {
    user: RequestUserModel;
    config: RequestConfigModel;
    app: A;
    orch: O;
}


export interface ExpressRequest<A = any, O = any> extends Request<any, any, any, any, IHttpRequestData<A, O>> {

}

export interface ExpressResponse<A = any, O = any> extends Response<any, IHttpRequestData<A, O>> {

}
