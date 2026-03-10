import express from "express";
import {
  createJob,
  deleteJob,
  getJobs,
  jobsById,
  patchJob,
  statusUpdate,
  updateJob,
} from "../controllers/job.controller";

const router = express.Router();

router.post("/create-job", createJob);
router.get("/", getJobs);
router.get("/:id", jobsById);
router.put("/:id", updateJob);
router.patch("/:id", patchJob);
router.patch("/:id/status", statusUpdate);
router.delete("/:id", deleteJob);

export default router;
