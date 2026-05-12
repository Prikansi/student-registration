import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
  fullName: string;
  email: string;
  emailHash: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  courseEnrolled: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  emailHash: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  courseEnrolled: { type: String, required: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IStudent>('Student', StudentSchema);