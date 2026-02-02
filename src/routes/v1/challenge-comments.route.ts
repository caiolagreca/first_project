import express from "express";
import { ExpressRequest, ExpressResponse } from "../../models";
import { ChallengeCommentModel } from "../../models/challenge-comments";
import { ChallengeCommentApp } from "../../app/challenge-comment";
import { HttpResponse } from "../../helpers";

export const challengeCommentRouter = express.Router();

challengeCommentRouter.use(
  (_, res: ExpressResponse<ChallengeCommentApp>, next) => {
    res.locals.app = new ChallengeCommentApp(
      res.locals.user,
      res.locals.config,
    );
    next();
  },
);

challengeCommentRouter.get(
  "/",
  (req: ExpressRequest, res: ExpressResponse<ChallengeCommentApp>) => {
    res.locals.app
      .getAll()
      .then((response) => {
        HttpResponse.ok(response)(req, res);
      })
      .catch((error) => {
        HttpResponse.error(error)(req, res);
      });
  },
);

challengeCommentRouter.get(
  "/:id",
  (req: ExpressRequest, res: ExpressResponse<ChallengeCommentApp>) => {
    const { id } = req.params;

    res.locals.app
      .getById(id)
      .then((response) => {
        HttpResponse.ok(response)(req, res);
      })
      .catch((error) => {
        HttpResponse.error(error)(req, res);
      });
  },
);

challengeCommentRouter.post(
  "/",
  (req: ExpressRequest, res: ExpressResponse<ChallengeCommentApp>) => {
    res.locals.app
      .create(req.body)
      .then((response) => {
        HttpResponse.ok(response)(req, res);
      })
      .catch((error) => {
        HttpResponse.error(error)(req, res);
      });
  },
);

challengeCommentRouter.put(
  "/:id",
  (req: ExpressRequest, res: ExpressResponse<ChallengeCommentApp>) => {
    const { id } = req.params;
    res.locals.app
      .update(id, req.body)
      .then((response) => {
        HttpResponse.ok(response)(req, res);
      })
      .catch((error) => {
        HttpResponse.error(error)(req, res);
      });
  },
);

challengeCommentRouter.patch(
  "/:id",
  (req: ExpressRequest, res: ExpressResponse<ChallengeCommentApp>) => {
    const { id } = req.params;
    res.locals.app
      .update(id, req.body)
      .then((response) => {
        HttpResponse.ok(response)(req, res);
      })
      .catch((error) => {
        HttpResponse.error(error)(req, res);
      });
  },
);

challengeCommentRouter.delete(
  "/:id",
  (req: ExpressRequest, res: ExpressResponse<ChallengeCommentApp>) => {
    const { id } = req.params;
    res.locals.app
      .delete(id)
      .then((response) => {
        HttpResponse.ok(response)(req, res);
      })
      .catch((error) => {
        HttpResponse.error(error)(req, res);
      });
  },
);
