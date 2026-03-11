import type { Request, Response } from "express";
import Recruiter from "../models/recruiter.model";

// --------------Create Recruiter-------------------

export const createRecruiter = async (req: Request, res: Response) => {
  try {
    const { name, email, temPassword, confirmTemPassword } = req.body;

    if (temPassword !== confirmTemPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingRecruiter = await Recruiter.findOne({ email });

    if (existingRecruiter) {
      return res.status(400).json({
        message: "Recruiter with this email already exists",
      });
    }

    const recruiter = await Recruiter.create({
      name,
      email,
      temPassword,
    });

    res.status(201).json(recruiter);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// --------------Update Recruiter data----------------

export const updateRecruiter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, temPassword } = req.body;

    const recruiter = await Recruiter.findByIdAndUpdate(
      id,
      { name, email, temPassword },
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

// ----------------Get Recruiter----------------

export const getRecruiter = async (req: Request, res: Response) => {
  const rec = await Recruiter.find();
  res.send(rec);
};

export const recruiterLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const recruiter = await Recruiter.findOne({ email });

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    if (recruiter.temPassword !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      recruiter,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/recruiter/:id
export const getRecruiterById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recruiter = await Recruiter.findById(id);
    if (!recruiter)
      return res.status(404).json({ message: "Recruiter not found" });

    res.json(recruiter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/recruiter/:id/profile
export const updateRecruiterProfile = async (req: Request, res: Response) => {
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
