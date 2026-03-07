import type { Request, Response } from "express";
import Job from "../models/job.model";

export const createJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getJobs = async (req: Request, res: Response) => {
  const jobs = await Job.find();
  res.json(jobs);
};
