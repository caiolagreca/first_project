//CRUD Database
import { Challenge } from "../../models/challenges/index";
import { Request, Response } from "express";

export const createChallenge = async (req: Request, res: Response) => {
  try {
    const challenge = await Challenge.create({
      name: req.body.name,
    });
    res.status(201).json(challenge);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const fetchChallenges = async (req: Request, res: Response) => {
  try {
    const challenges = await Challenge.find({});
    res.status(200).json(challenges);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const fecthChallenge = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const challenge = await Challenge.findById(id);
    if (!challenge) res.status(404).json({ message: "User not found" });
    res.status(200).json(challenge);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateChallenge = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const challenge = await Challenge.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    if (!challenge) res.status(404).json({ message: "User not found" });
    res.json(challenge);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteChallenge = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const challenge = await Challenge.findByIdAndDelete(id);
    if (!challenge) res.status(404).json({ message: "User not found" });
    res.json(challenge);
  } catch (err) {
    res.status(400).json(err);
  }
};
