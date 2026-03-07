import type { Request, Response } from "express";
import Recruiter from "../models/recruiter.model";

export const createRecruiter = async (req: Request, res: Response) => {
  try {
    const { name, email, tempPassword, confirmTempPassword } = req.body;

    if (tempPassword !== confirmTempPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const recruiter = await Recruiter.create({
      name,
      email,
      tempPassword,
    });

    res.status(201).json(recruiter);
  } catch (error) {
    res.status(500).json({ error });
  }
};
