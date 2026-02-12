import express from "express";
import { ExpressRequest, ExpressResponse } from "../../models";
import { PlacesDetailsApp } from "../../app/google-places";
import { HttpResponse } from "../../helpers";

export const googleRouter = express.Router();

googleRouter.use((_, res: ExpressResponse<PlacesDetailsApp>, next) => {
  res.locals.app = new PlacesDetailsApp(res.locals.user, res.locals.config);
  next();
});

/**
 * @swagger
 * /v1/google-places/search:
 *   post:
 *     summary: Search for places using Google Places API
 *     description: Returns a list of places matching the text query.
 *     tags:
 *       - v1/google-places
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlacesDetailsFormModel'
 *           example:
 *             textQuery: "pizza near Sydney"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of places found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlaceDetailsModel'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
googleRouter.post(
  "/search",
  (req: ExpressRequest, res: ExpressResponse<PlacesDetailsApp>) => {
    res.locals.app
      .searchText(req.body)
      .then((response) => {
        HttpResponse.ok(response)(req, res);
      })
      .catch((error) => {
        HttpResponse.error(error)(req, res);
      });
  },
);
