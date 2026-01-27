import express from "express";
import { HttpResponse } from "../../helpers";
import { ChallengeApp } from "../../app/challenge/challenge.app";
import { ExpressRequest, ExpressResponse } from "../../models";

export const router = express.Router();

router.use((_, res: ExpressResponse<ChallengeApp>, next) => {
    res.locals.app = new ChallengeApp(res.locals.user, res.locals.config);
    next();
});

//////// 
// GET
//////// 
router.get('/:id', (req: ExpressRequest, res: ExpressResponse<ChallengeApp>) => {
    const { id } = req.params;

    res.locals.app.getById(id).then((response) => {
        HttpResponse.ok(response)(req, res);
    }).catch((error) => {
        HttpResponse.error(error)(req, res);
    });
});

router.get('/', (req: ExpressRequest, res: ExpressResponse<ChallengeApp>) => {
    res.locals.app.getAll().then((response) => {
        HttpResponse.ok(response)(req, res);
    }).catch((error) => {
        HttpResponse.error(error)(req, res);
    });
});


//////// 
// POST
//////// 
router.post('/', (req: ExpressRequest, res: ExpressResponse<ChallengeApp>) => {

    res.locals.app.create(req.body).then((response) => {
        HttpResponse.ok(response)(req, res);
    }).catch((error) => {
        HttpResponse.error(error)(req, res);
    });
});

//////// 
// PUT
//////// 
router.put('/:id', (req: ExpressRequest, res: ExpressResponse<ChallengeApp>) => {

    const { id } = req.params;

    res.locals.app.update(id, req.body).then((response) => {
        HttpResponse.ok(response)(req, res);
    }).catch((error) => {
        HttpResponse.error(error)(req, res);
    });
});

//////// 
// PATCH
//////// 
router.patch('/:id', (req: ExpressRequest, res: ExpressResponse<ChallengeApp>) => {

    const { id } = req.params;

    res.locals.app.update(id, req.body).then((response) => {
        HttpResponse.ok(response)(req, res);
    }).catch((error) => {
        HttpResponse.error(error)(req, res);
    });
});

//////// 
// DELEGE
//////// 
router.delete('/:id', (req: ExpressRequest, res: ExpressResponse<ChallengeApp>) => {

    const { id } = req.params;

    res.locals.app.delete(id).then((response) => {
        HttpResponse.ok(response)(req, res);
    }).catch((error) => {
        HttpResponse.error(error)(req, res);
    });
});
