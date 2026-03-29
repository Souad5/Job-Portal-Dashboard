import express from "express";
import cors from "cors";

import adminRoutes from "./routes/admin.routes";
import jobRoutes from "./routes/job.routers";
import loginRoutes from "./routes/login.routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ your frontend origin
    credentials: true, // ✅ allow cookies
  }),
);
app.use(express.json());
app.use(cookieParser());

// ---------routes------------

app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api", loginRoutes);

export default app;
