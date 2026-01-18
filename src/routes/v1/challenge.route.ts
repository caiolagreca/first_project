//Private enpdpoints - PUT/PATCH/DELETE/POST
import express from "express";
import { authenticate } from "../../middleware/auth";
import {
  createChallenge,
  deleteChallenge,
  updateChallenge,
} from "../../app/challenge";

export const challengePrivateRoutes = express.Router();

challengePrivateRoutes.post("/", authenticate, createChallenge);
challengePrivateRoutes.put("/:id", authenticate, updateChallenge);
challengePrivateRoutes.delete("/:id", authenticate, deleteChallenge);
