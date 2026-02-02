import express from "express";
import { ChallengeCommentApp } from "../../app/challenge-comment/challenge-comment.app";
import { ExpressRequest, ExpressResponse } from "../../models";
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
