import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  jobTitle: string;
  employmentType: string;
  jobSummary: string;
  companyName: string;
  companyDescription: string;
  experienceLevel: string;
  education: string;
  requiredSkills: string[];
  niceToHave: string[];
}

const jobSchema = new Schema({
  jobTitle: { type: String, required: true },
  employmentType: { type: String, required: true },

  salaryRange: {
    min: Number,
    max: Number,
    currency: String,
    period: String,
  },

  jobSummary: String,
  companyName: String,

  location: {
    city: String,
    country: String,
    timezonePreference: String,
  },

  companyDescription: String,
  experienceLevel: String,
  education: String,

  requiredSkills: [String],
  niceToHave: [String],
});

export default mongoose.model("Job", jobSchema);
