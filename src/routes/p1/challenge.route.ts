//Public endpoint - GET
import express from "express";
import { HttpResponse } from "../../helpers";
import { ChallengeApp } from "../../app/challenge/challenge.app";
import { ExpressRequest, ExpressResponse } from "../../models";

export const challengeRouter = express.Router();

challengeRouter.use((_, res: ExpressResponse<ChallengeApp>, next) => {
  res.locals.app = new ChallengeApp(res.locals.user, res.locals.config);
  next();
});

/**
 * @swagger
 * /p1/challenge:
 *   get:
 *     summary: Get all challenges (Public)
 *     description: Publicly accessible endpoint to retrieve a list of all challenges without authentication
 *     tags: [p1/challenge]
 *     responses:
 *       200:
 *         description: List of challenges retrieved successfully
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
 *                         $ref: '#/components/schemas/Challenge'
 *             examples:
 *               success:
 *                 value:
 *                   success: true
 *                   data:
 *                     - _id: "507f1f77bcf86cd799439011"
 *                       name: "Challenge 1"
 *                       userId: "507f191e810c19729de860ea"
 *                       date: "2026-01-27T10:00:00Z"
 *                     - _id: "507f1f77bcf86cd799439012"
 *                       name: "Challenge 2"
 *                       userId: "507f191e810c19729de860eb"
 *                       date: "2026-01-27T11:00:00Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
challengeRouter.get(
  "/",
  (req: ExpressRequest, res: ExpressResponse<ChallengeApp>) => {
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
