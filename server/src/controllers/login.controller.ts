import { Request, Response } from "express";
import Recruiter from "../models/recruiter.model";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/auth.middleware";

// ---------------- Recruiter Login ----------------
export const recruiterLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const recruiter = await Recruiter.findOne({ email });

    if (!recruiter) {
      return res.status(404).json({
        message: "Recruiter not found",
      });
    }

    // plain password check
    if (recruiter.temPassword !== password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // generate JWT token
    const token = jwt.sign(
      {
        id: recruiter._id,
        email: recruiter.email,
        role: "recruiter",
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "5m",
      },
    );
    res.cookie("token", token, {
      httpOnly: true, //  can't access from JS
      secure: true,
      sameSite: "none",
      maxAge: 300000,
    });
    res.status(200).json({
      message: "Login successful",
      token,
      recruiter: {
        id: recruiter._id,
        email: recruiter.email,
        name: recruiter.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ---------------- Get Recruiter by ID ----------------
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

// GET /recruiter/me
export const getCurrentRecruiter = async (req: AuthRequest, res: Response) => {
  try {
    const recruiterId = req.user?.id;

    if (!recruiterId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const recruiter = await Recruiter.findById(recruiterId);

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.json(recruiter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Update Recruiter Profile ----------------
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
