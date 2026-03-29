// logout.controller.ts
import { Request, Response } from "express";

export const logoutRecruiter = (req: Request, res: Response) => {
  // Clear the token cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // true in production
    sameSite: "lax",
  });

  res.json({ message: "Logged out successfully" });
};
