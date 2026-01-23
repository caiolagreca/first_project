import express from "express";
import { ExpressResponse, ExpressRequest } from "../models";

export class HttpResponse {

    static ok(data: any) {

        let statusCode = 200;
        if (!data) {
            statusCode = 201;
        } 

        const payload = {
            data
        }

        return (req: ExpressRequest, res: ExpressResponse) => {
            HttpResponse.response(res, statusCode, payload);
        }
    }

    static error(data: any) {

        let statusCode = 400;

        return (req: ExpressRequest, res: ExpressResponse) => {
            HttpResponse.response(res, statusCode, data);
        }
    }

    static response(res: ExpressResponse, code: number, payload: any) {

		if (payload)
			res.status(code).json(payload);
		else
			res.sendStatus(code);
    }

}
