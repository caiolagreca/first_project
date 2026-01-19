import { Request, Response } from "express";
import { ChallengeRepository } from "./challenge.repository";

export class ChallengeApp {
  private repository: ChallengeRepository;

  constructor(repository: ChallengeRepository) {
    this.repository = repository;
  }

  createChallenge = async (req: Request, res: Response) => {
    try {
      const challenge = await this.repository.create({
        name: req.body.name,
      });
      res.status(201).json(challenge);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  getAllChallenges = async (req: Request, res: Response) => {
    try {
      const challenges = await this.repository.findAll();
      res.status(200).json(challenges);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  getChallengeById = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    try {
      const challenge = await this.repository.findById(id);
      if (!challenge)
        return res.status(404).json({ message: "User not found" });
      res.status(200).json(challenge);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  updateChallenge = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    try {
      const challenge = await this.repository.update(id, {
        name: req.body.name,
      });
      if (!challenge)
        return res.status(404).json({ message: "User not found" });
      res.status(201).json(challenge);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  deleteChallenge = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    try {
      const challenge = await this.repository.delete(id);
      if (!challenge)
        return res.status(404).json({ message: "User not found" });
      res.json(challenge);
    } catch (err) {
      res.status(400).json(err);
    }
  };
}
