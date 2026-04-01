import express from "express";
import {
  getCurrentRecruiter,
  recruiterLogin,
} from "../controllers/login.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { logoutRecruiter } from "../controllers/logout.controller";

const router = express.Router();

router.post("/login", recruiterLogin);
router.get("/recruiter/me", verifyToken, getCurrentRecruiter);
router.post("/logout", logoutRecruiter);

export default router;
