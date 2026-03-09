import mongoose, { Schema, Document } from "mongoose";

export interface IRecruiter extends Document {
  name: string;
  email: string;
  temPassword: string;
}

const recruiterSchema = new Schema<IRecruiter>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  temPassword: { type: String, required: true },
});

export default mongoose.model<IRecruiter>("Recruiter", recruiterSchema);
