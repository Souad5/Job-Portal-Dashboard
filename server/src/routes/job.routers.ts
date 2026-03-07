import express from "express";
import { createJob, getJobs } from "../controllers/job.controller";

const router = express.Router();

router.post("/create-job", createJob);
router.get("/", getJobs);

export default router;
