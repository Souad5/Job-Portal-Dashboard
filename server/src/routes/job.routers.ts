import express from "express";
import {
  createJob,
  deleteJob,
  getJobs,
  patchJob,
  updateJob,
} from "../controllers/job.controller";

const router = express.Router();

router.post("/create-job", createJob);
router.get("/", getJobs);
router.put("/:id", updateJob);
router.patch("/:id", patchJob);
router.delete("/:id", deleteJob);

export default router;
