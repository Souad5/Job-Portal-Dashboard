import mongoose, { Schema, Document } from "mongoose";

export interface IRecruiter extends Document {
  name: string;
  email: string;
  tempPassword: string;
}

const recruiterSchema = new Schema<IRecruiter>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tempPassword: { type: String, required: true },
});

export default mongoose.model<IRecruiter>("Recruiter", recruiterSchema);
