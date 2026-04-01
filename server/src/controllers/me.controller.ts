import { Response } from "express";
import Recruiter from "../models/recruiter.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const recruiter = await Recruiter.findById(req.user.id);
    if (!recruiter)
      return res.status(404).json({ message: "Recruiter not found" });

    res.json({
      _id: recruiter._id,
      name: recruiter.name,
      email: recruiter.email,
      role: recruiter.role ?? "Recruiter",
      profilePic: recruiter.profilePic ?? null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
