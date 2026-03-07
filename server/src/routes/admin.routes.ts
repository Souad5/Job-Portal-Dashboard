import express from "express";
import { createRecruiter } from "../controllers/admin.controller";

const router = express.Router();

router.post("/create-recruiter", createRecruiter);

export default router;
