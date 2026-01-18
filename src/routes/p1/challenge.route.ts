//Public endpoints - GET/GET:Id
import express from "express";
import { fecthChallenge, fetchChallenges } from "../../app/challenge";

export const challengePublicRoutes = express.Router();

challengePublicRoutes.get("/", fetchChallenges);
challengePublicRoutes.get("/:id", fecthChallenge);
