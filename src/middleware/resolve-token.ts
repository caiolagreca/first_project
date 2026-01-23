import { NextFunction } from "express";
import { ExpressRequest, ExpressResponse } from "../models";

export const resolveToken = (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {

    const { authorization } = req.headers || {};

    if (authorization) {
        try {
            const user = JSON.parse(atob(authorization));
            res.locals.user = user;
        } catch { }
    }
    
    next();
}