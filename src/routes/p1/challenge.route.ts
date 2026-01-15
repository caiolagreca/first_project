//Public endpoints - GET/GET:Id
import express from "express";
import { fetchChallenges } from "../../app/challenge";

export const challengeRoutes = express.Router();

challengeRoutes.get("/", fetchChallenges);
