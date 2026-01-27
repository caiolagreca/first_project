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

/**
 * @swagger
 * /v1/challenge/{id}:
 *   get:
 *     summary: Get a challenge by ID
 *     description: Retrieve a specific challenge by its unique identifier
 *     tags: [v1/challenge]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The challenge ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Challenge retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Challenge'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         description: Internal server error
 */
router.get('/:id', (req: ExpressRequest, res: ExpressResponse<ChallengeApp>) => {
    const { id } = req.params;

    res.locals.app.getById(id).then((response) => {
        HttpResponse.ok(response)(req, res);
    }).catch((error) => {
        HttpResponse.error(error)(req, res);
    });
});

/**
 * @swagger
 * /v1/challenge:
 *   get:
 *     summary: Get all challenges
 *     description: Retrieve a list of all challenges
 *     tags: [v1/challenge]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /v1/challenge:
 *   post:
 *     summary: Create a new challenge
 *     description: Create a new challenge with the provided data
 *     tags: [v1/challenge]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChallengeInput'
 *     responses:
 *       200:
 *         description: Challenge created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Challenge'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /v1/challenge/{id}:
 *   put:
 *     summary: Update a challenge (full update)
 *     description: Update all fields of an existing challenge
 *     tags: [v1/challenge]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The challenge ID
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChallengeInput'
 *     responses:
 *       200:
 *         description: Challenge updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Challenge'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /v1/challenge/{id}:
 *   patch:
 *     summary: Update a challenge (partial update)
 *     description: Update specific fields of an existing challenge
 *     tags: [v1/challenge]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The challenge ID
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Challenge name
 *                 example: Updated Challenge Name
 *               userId:
 *                 type: string
 *                 description: User ID
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Challenge date
 *     responses:
 *       200:
 *         description: Challenge updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Challenge'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', (req: ExpressRequest, res: ExpressResponse<ChallengeApp>) => {

    const { id } = req.params;

    res.locals.app.update(id, req.body).then((response) => {
        HttpResponse.ok(response)(req, res);
    }).catch((error) => {
        HttpResponse.error(error)(req, res);
    });
});

//////// 
// DELETE
//////// 

/**
 * @swagger
 * /v1/challenge/{id}:
 *   delete:
 *     summary: Delete a challenge
 *     description: Delete an existing challenge by its ID
 *     tags: [v1/challenge]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The challenge ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Challenge deleted successfully
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
router.delete('/:id', (req: ExpressRequest, res: ExpressResponse<ChallengeApp>) => {

    const { id } = req.params;

    res.locals.app.delete(id).then((response) => {
        HttpResponse.ok(response)(req, res);
    }).catch((error) => {
        HttpResponse.error(error)(req, res);
    });
});
