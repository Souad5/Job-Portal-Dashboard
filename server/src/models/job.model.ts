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
  status: "approved" | "rejected" | "pending";
  createdAt: Date;
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
    status: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: "pending",
    },
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.model<IJob>("Job", jobSchema);
