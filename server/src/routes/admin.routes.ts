import express from "express";
import {
  createRecruiter,
  updateRecruiter,
  patchRecruiter,
  deleteRecruiter,
  getRecruiter,
} from "../controllers/admin.controller";

const router = express.Router();

router.post("/create-recruiter", createRecruiter);
router.get("/recruiter-all", getRecruiter);
router.put("/recruiter/:id", updateRecruiter);
router.patch("/recruiter/:id", patchRecruiter);
router.delete("/recruiter/:id", deleteRecruiter);

export default router;
