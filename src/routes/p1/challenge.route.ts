//Public endpoints - GET/GET:Id
import express from "express";
import { HttpResponse } from "../../helpers";
import { ChallengeApp } from "../../app/challenge/challenge.app";
import { ExpressRequest, ExpressResponse } from "../../models";

export const router = express.Router();

router.use((_, res: ExpressResponse<ChallengeApp>, next) => {
    res.locals.app = new ChallengeApp(res.locals.user, res.locals.config);
    next();
});

router.get('/', (req: ExpressRequest, res: ExpressResponse<ChallengeApp>) => {
    res.locals.app.getAll().then((response) => {
        HttpResponse.ok(response)(req, res);
    }).catch((error) => {
        HttpResponse.error(error)(req, res);
    });
});
