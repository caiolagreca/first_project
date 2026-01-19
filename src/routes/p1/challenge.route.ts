//Public endpoints - GET/GET:Id
import express from "express";
import { ChallengeRepository } from "../../app/challenge";
import { ChallengeApp } from "../../app/challenge/challenge.app";

export const challengePublicRoutes = express.Router();
export const repository = new ChallengeRepository();
export const app = new ChallengeApp(repository);

challengePublicRoutes.get("/", app.getAllChallenges);
challengePublicRoutes.get("/:id", app.getChallengeById);
