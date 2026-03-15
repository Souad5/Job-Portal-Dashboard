import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  type: string;
  summary: string;
  companyName: string;
  companyDescription: string;
  experience: string;
  education?: string;
  skills: string[];
  niceToHave: string[];
  workMode: string;
  salaryRange?: {
    min?: number;
    max?: number;
    currency?: string;
    period?: string;
  };
  status: "approved" | "rejected" | "pending";
  createdAt: Date;
  recruiterId: string; // <-- NEW: link to the recruiter who posted
}

const jobSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    summary: String,
    companyName: String,
    companyDescription: String,
    experience: String,
    education: String,
    skills: [String],
    niceToHave: [String],
    workMode: String,
    salaryRange: {
      min: Number,
      max: Number,
      currency: String,
      period: String,
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: "pending",
    },
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    }, // <--- new
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.model<IJob>("Job", jobSchema);
