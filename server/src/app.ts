import express from "express";
import cors from "cors";

import adminRoutes from "./routes/admin.routes";
import jobRoutes from "./routes/job.routers";
import loginRoutes from "./routes/login.routes";

const app = express();

app.use(cors());
app.use(express.json());

// ---------routes------------

app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api", loginRoutes);

export default app;
