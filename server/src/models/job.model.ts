import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  type: string;
  summary: string;
  companyName: string;
  companyDescription: string;
  experience: string;
  education: string;
  skills: string[];
  niceToHave: string[];
}

const jobSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },

  salaryRange: {
    min: Number,
    max: Number,
    currency: String,
    period: String,
  },

  summary: String,
  companyName: String,

  location: {
    city: String,
    country: String,
    timezonePreference: String,
  },

  companyDescription: String,
  experienceLevel: String,
  education: String,

  skills: [String],
  niceToHave: [String],
});

export default mongoose.model("Job", jobSchema);
