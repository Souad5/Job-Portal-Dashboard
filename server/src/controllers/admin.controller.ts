import type { Request, Response } from "express";
import Recruiter from "../models/recruiter.model";

// ---------------- Create Recruiter ----------------
export const createRecruiter = async (req: Request, res: Response) => {
  try {
    const { name, email, temPassword, confirmTemPassword } = req.body;

    if (temPassword !== confirmTemPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res
        .status(400)
        .json({ message: "Recruiter with this email already exists" });
    }

    const recruiter = await Recruiter.create({ name, email, temPassword });
    res.status(201).json(recruiter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Update Recruiter ----------------
export const updateRecruiter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, temPassword } = req.body;

    const recruiter = await Recruiter.findByIdAndUpdate(
      id,
      { name, email, temPassword },
      { returnDocument: "after" },
    );

    if (!recruiter)
      return res.status(404).json({ message: "Recruiter not found" });

    res.json(recruiter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Patch Recruiter ----------------
export const patchRecruiter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recruiter = await Recruiter.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });

    if (!recruiter)
      return res.status(404).json({ message: "Recruiter not found" });

    res.json(recruiter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Delete Recruiter ----------------
export const deleteRecruiter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recruiter = await Recruiter.findByIdAndDelete(id);

    if (!recruiter)
      return res.status(404).json({ message: "Recruiter not found" });

    res.json({ message: "Recruiter deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Get All Recruiters ----------------
export const getRecruiter = async (_req: Request, res: Response) => {
  try {
    const recruiters = await Recruiter.find();
    res.json(recruiters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
