import express from "express";
import cors from "cors";

import adminRoutes from "./routes/admin.routes";
import jobRoutes from "./routes/job.routers";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);

export default app;
