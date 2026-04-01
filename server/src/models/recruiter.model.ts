import mongoose, { Schema, Document } from "mongoose";

export interface IRecruiter extends Document {
  name: string;
  email: string;
  temPassword: string;
}

const recruiterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    temPassword: { type: String, required: true },

    profilePic: { type: String },
    phone: { type: String },
    city: { type: String },
    country: { type: String },
    postalCode: { type: String },
    dateOfBirth: { type: String },

    role: {
      type: String,
      default: "Recruiter",
    },
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.model("Recruiter", recruiterSchema);
