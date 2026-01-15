//CRUD Database
import { Challenge } from "../../models/challenges/index";
import { Request, Response } from "express";

export const createChallenge = async (req: Request, res: Response) => {
  try {
    const challenge = await Challenge.create({
      name: req.body.name,
    });
    res.json(challenge);
  } catch (err) {
    res.json(err);
  }
};

export const fetchChallenges = async (req: Request, res: Response) => {
  try {
    const challenges = await Challenge.find({});
    res.json(challenges);
  } catch (err) {
    res.json(err);
  }
};

export const fecthChallenge = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const challenge = await Challenge.findById(id);
    res.json(challenge);
  } catch (err) {
    res.json(err);
  }
};

export const updateChallenge = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const challenge = await Challenge.findByIdAndUpdate(
      id,
      {
        name: req?.body?.name,
      },
      { new: true }
    );
    res.json(challenge);
  } catch (err) {
    res.json(err);
  }
};

export const deleteChallenge = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const challenge = await Challenge.findByIdAndDelete(id);
    res.json(challenge);
  } catch (err) {
    res.json(err);
  }
};
