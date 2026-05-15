import dotenv from 'dotenv'

dotenv.config()

import app from './app';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Student from './models/Student';
import { encryptFrontendData, encryptBackendData, hashEmail } from './utils/crypto';


const seedDefaultUser = async () => {
  const existing = await Student.findOne({ emailHash: hashEmail('john@example.com') });
  if (existing) {
    return;
  }

  const frontendEncrypted = {
    fullName: encryptFrontendData('John Doe'),
    email: encryptFrontendData('john@example.com'),
    phoneNumber: encryptFrontendData('1234567890'),
    address: encryptFrontendData('123 Main Street, City')
  };

  const backendEncrypted = {
    fullName: encryptBackendData(frontendEncrypted.fullName),
    email: encryptBackendData(frontendEncrypted.email),
    phoneNumber: encryptBackendData(frontendEncrypted.phoneNumber),
    address: encryptBackendData(frontendEncrypted.address)
  };

  const student = new Student({
    fullName: backendEncrypted.fullName,
    email: backendEncrypted.email,
    emailHash: hashEmail('john@example.com'),
    phoneNumber: backendEncrypted.phoneNumber,
    dateOfBirth: '2000-01-15',
    gender: 'Male',
    address: backendEncrypted.address,
    courseEnrolled: 'Computer Science',
    password: await bcrypt.hash('password123', 10)
  });

  await student.save();
  console.log('Seeded default student: john@example.com / password123');
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(async () => {
    console.log('MongoDB connected successfully');
    await seedDefaultUser();
  })
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});