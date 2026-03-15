import express from "express";
import {
  createRecruiter,
  updateRecruiter,
  patchRecruiter,
  deleteRecruiter,
  getRecruiter,
} from "../controllers/admin.controller";
import {
  getRecruiterById,
  updateRecruiterProfile,
} from "../controllers/login.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { getMe } from "../controllers/me.controller";

const router = express.Router();

router.post("/create-recruiter", createRecruiter);
router.get("/recruiter-all", getRecruiter);
router.put("/recruiter/:id", updateRecruiter);
router.patch("/recruiter/:id", patchRecruiter);
router.delete("/recruiter/:id", deleteRecruiter);
router.get("/recruiter/:id", getRecruiterById);
router.put("/recruiter/:id/profile", updateRecruiterProfile);
router.get("/recruiter/me", verifyToken, getMe);

export default router;
