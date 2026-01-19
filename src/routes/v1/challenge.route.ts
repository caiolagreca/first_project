//Private enpdpoints - PUT/PATCH/DELETE/POST
import express from "express";
import { authenticate } from "../../middleware/auth";
import { ChallengeRepository } from "../../app/challenge";
import { ChallengeApp } from "../../app/challenge/challenge.app";

export const challengePrivateRoutes = express.Router();
export const repository = new ChallengeRepository();
export const app = new ChallengeApp(repository);

challengePrivateRoutes.post("/", authenticate, app.createChallenge);
challengePrivateRoutes.put("/:id", authenticate, app.updateChallenge);
challengePrivateRoutes.delete("/:id", authenticate, app.deleteChallenge);
