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


/**
 * @swagger
 * /p1/challenge-comments:
 *   get:
 *     summary: Get all challenge comments (Public)
 *     description: Publicly accessible endpoint to retrieve a list of all challenge comments without authentication
 *     tags: [p1/challenge-comments]
 *     responses:
 *       200:
 *         description: List of challenge comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/ChallengeComment'
 *             examples:
 *               success:
 *                 value:
 *                   success: true
 *                   data:
 *                     - _id: "609e129e8bfa4b0015b708a1"
 *                       text: "Great challenge!"
 *                       userId: "507f191e810c19729de860ea"
 *                       date: "2026-01-27T12:00:00Z"
 *                       challengeId: "507f1f77bcf86cd799439011"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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
