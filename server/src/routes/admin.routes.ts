import express from "express";
import {
  createRecruiter,
  updateRecruiter,
  patchRecruiter,
  deleteRecruiter,
  getRecruiter,
  recruiterLogin,
  getRecruiterById,
  updateRecruiterProfile,
} from "../controllers/admin.controller";

const router = express.Router();

router.post("/create-recruiter", createRecruiter);
router.get("/recruiter-all", getRecruiter);
router.put("/recruiter/:id", updateRecruiter);
router.patch("/recruiter/:id", patchRecruiter);
router.delete("/recruiter/:id", deleteRecruiter);
router.post("/login", recruiterLogin);
router.get("/recruiter/:id", getRecruiterById);
router.put("/recruiter/:id/profile", updateRecruiterProfile);

export default router;
