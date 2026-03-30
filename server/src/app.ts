import express from "express";
import cors from "cors";

import adminRoutes from "./routes/admin.routes";
import jobRoutes from "./routes/job.routers";
import loginRoutes from "./routes/login.routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "https://job-portal-delta-rust.vercel.app",
    credentials: true, // allow cookies
  }),
);
app.use(express.json());
app.use(cookieParser());

// ---------routes------------

app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api", loginRoutes);

export default app;
