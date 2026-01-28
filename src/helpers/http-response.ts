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

	static error(err: any) {

		let statusCode = 400;

		const payload = {
			error: {
				code: err.message,
				message: err.toString()
			}
		}

		return (req: ExpressRequest, res: ExpressResponse) => {
			HttpResponse.response(res, statusCode, payload);
		}
	}

	static response(res: ExpressResponse, code: number, payload: any) {

		if (payload)
			res.status(code).json(payload);
		else
			res.sendStatus(code);
	}

}
