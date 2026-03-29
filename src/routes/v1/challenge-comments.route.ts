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

/**
 * @swagger
 * /v1/challenge-comments:
 *   get:
 *     summary: Get all challenge comments
 *     description: Retrieve a list of all challenge comments
 *     tags: [v1/challenge-comments]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Internal server error
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

/**
 * @swagger
 * /v1/challenge-comments/{id}:
 *   get:
 *     summary: Get a challenge comment by ID
 *     description: Retrieve a specific challenge comment by its unique identifier
 *     tags: [v1/challenge-comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *         example: 609e129e8bfa4b0015b708a1
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/ChallengeComment'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /v1/challenge-comments:
 *   post:
 *     summary: Create a new challenge comment
 *     description: Create a new comment for a challenge
 *     tags: [v1/challenge-comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChallengeCommentInput'
 *     responses:
 *       200:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/ChallengeComment'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /v1/challenge-comments/{id}:
 *   put:
 *     summary: Update a challenge comment (full update)
 *     description: Update all fields of an existing challenge comment
 *     tags: [v1/challenge-comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *         example: 609e129e8bfa4b0015b708a1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChallengeCommentInput'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/ChallengeComment'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /v1/challenge-comments/{id}:
 *   patch:
 *     summary: Update a challenge comment (partial update)
 *     description: Update specific fields of an existing challenge comment
 *     tags: [v1/challenge-comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *         example: 609e129e8bfa4b0015b708a1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Comment text
 *                 example: Updated comment text
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/ChallengeComment'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /v1/challenge-comments/{id}:
 *   delete:
 *     summary: Delete a challenge comment
 *     description: Delete an existing challenge comment by its ID
 *     tags: [v1/challenge-comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *         example: 609e129e8bfa4b0015b708a1
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         description: Internal server error
 */

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
