import express from "express";
import { ExpressRequest, ExpressResponse } from "../../models";
import { StripeProductApp } from "../../app/stripe/stripe-products";
import { HttpResponse } from "../../helpers";

export const stripeProductRouter = express.Router();

stripeProductRouter.use((_, res: ExpressResponse<StripeProductApp>, next) => {
  res.locals.app = new StripeProductApp(res.locals.user, res.locals.config);
  next();
});

/**
 * @swagger
 * /v1/stripe-products:
 *   post:
 *     summary: Create a Stripe product
 *     description: Creates a new product in Stripe and returns the product object.
 *     tags:
 *       - v1/stripe-products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Test Product"
 *               description:
 *                 type: string
 *                 example: "A product for testing Stripe integration"
 *     responses:
 *       200:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Stripe product object
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
stripeProductRouter.post(
  "/",
  (req: ExpressRequest, res: ExpressResponse<StripeProductApp>) => {
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
