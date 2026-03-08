import type { Request, Response } from "express";
import Recruiter from "../models/recruiter.model";

// --------------Create Recruiter-------------------

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
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// --------------Update Recruiter data----------------

export const updateRecruiter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, tempPassword } = req.body;

    const recruiter = await Recruiter.findByIdAndUpdate(
      id,
      { name, email, tempPassword },
      { new: true },
    );

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.json(recruiter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------Update partial data--------------

export const patchRecruiter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const recruiter = await Recruiter.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.json(recruiter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------delete recruiter------------------

export const deleteRecruiter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const recruiter = await Recruiter.findByIdAndDelete(id);

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.json({ message: "Recruiter deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
