import express from "express";
import {
  createRecruiter,
  updateRecruiter,
  patchRecruiter,
  deleteRecruiter,
} from "../controllers/admin.controller";

const router = express.Router();

router.post("/create-recruiter", createRecruiter);
router.put("/recruiter/:id", updateRecruiter);
router.patch("/recruiter/:id", patchRecruiter);
router.delete("/recruiter/:id", deleteRecruiter);

export default router;
