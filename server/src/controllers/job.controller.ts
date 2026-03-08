import type { Request, Response } from "express";
import Job from "../models/job.model";

// -------------------create jobs-------------------

export const createJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ---------------get Jobs-----------------

export const getJobs = async (req: Request, res: Response) => {
  const jobs = await Job.find();
  res.json(jobs);
};

// -------------------update jobs-------------------------

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndUpdate(id, req.body, { new: true });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ----------------------partial update jobs---------------------

export const patchJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndUpdate(id, req.body, { new: true });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ----------------------delete jobs-------------------------------

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
