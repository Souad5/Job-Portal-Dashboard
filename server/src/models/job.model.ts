import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  type: string;
  summary: string;
  companyName: string;
  location: string;
  companyDescription: string;
  experience: string;
  education: string;
  skills: string;
  niceToHave: string;
}

const jobSchema = new Schema<IJob>({
  title: String,
  type: { type: String, default: "Full-time" },
  summary: String,
  companyName: String,
  location: String,
  companyDescription: String,
  experience: String,
  education: String,
  skills: String,
  niceToHave: String,
});

export default mongoose.model<IJob>("Job", jobSchema);
