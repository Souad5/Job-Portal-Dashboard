import express from "express";
import {
  getCurrentRecruiter,
  recruiterLogin,
} from "../controllers/login.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/login", recruiterLogin);
router.get("/recruiter/me", verifyToken, getCurrentRecruiter);

export default router;
