import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Student from '../models/Student';
import {
  decryptFrontendData,
  encryptBackendData,
  decryptBackendData,
  hashEmail
} from '../utils/crypto';

const buildBackendStudent = async (studentData: any, password: string) => {
  const decryptedEmail = decryptFrontendData(studentData.email);
  const decryptedFullName = decryptFrontendData(studentData.fullName);
  const decryptedPhoneNumber = decryptFrontendData(studentData.phoneNumber);
  const decryptedAddress = decryptFrontendData(studentData.address);

  const emailHash = hashEmail(decryptedEmail);
  const hashedPassword = await bcrypt.hash(password, 10);

  return {
    fullName: encryptBackendData(decryptedFullName),
    email: encryptBackendData(decryptedEmail),
    emailHash,
    phoneNumber: encryptBackendData(decryptedPhoneNumber),
    dateOfBirth: studentData.dateOfBirth,
    gender: studentData.gender,
    address: encryptBackendData(decryptedAddress),
    courseEnrolled: studentData.courseEnrolled,
    password: hashedPassword
  };
};

const decryptBackendStudent = (student: any) => {
  const decrypted = { ...student };
  decrypted.fullName = decryptBackendData(student.fullName);
  decrypted.email = decryptBackendData(student.email);
  decrypted.phoneNumber = decryptBackendData(student.phoneNumber);
  decrypted.address = decryptBackendData(student.address);
  delete decrypted.password;
  delete decrypted.emailHash;
  return decrypted;
};

export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, phoneNumber, dateOfBirth, gender, address, courseEnrolled, password } = req.body;

    const studentBody = { fullName, email, phoneNumber, dateOfBirth, gender, address, courseEnrolled };
    const backendStudent = await buildBackendStudent(studentBody, password);

    const existingStudent = await Student.findOne({ emailHash: backendStudent.emailHash });
    if (existingStudent) {
      res.status(400).json({ message: 'Student with this email already exists' });
      return;
    }

    const student = new Student(backendStudent);
    await student.save();

    res.status(201).json({ message: 'Student created successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating student', error: error.message });
  }
};

export const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.find();
    const results = students.map(student => decryptBackendStudent(student.toObject()));
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    if (updateData.email) {
      const decryptedEmail = decryptFrontendData(updateData.email);
      updateData.emailHash = hashEmail(decryptedEmail);
      updateData.email = encryptBackendData(decryptedEmail);
    }

    if (updateData.fullName) {
      updateData.fullName = encryptBackendData(decryptFrontendData(updateData.fullName));
    }

    if (updateData.phoneNumber) {
      updateData.phoneNumber = encryptBackendData(decryptFrontendData(updateData.phoneNumber));
    }

    if (updateData.address) {
      updateData.address = encryptBackendData(decryptFrontendData(updateData.address));
    }

    const student = await Student.findByIdAndUpdate(id, updateData, { new: true });
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    res.json({ message: 'Student updated successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating student', error: error.message });
  }
};

export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting student', error: error.message });
  }
};

export const loginStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const decryptedEmail = decryptFrontendData(email);
    const emailHash = hashEmail(decryptedEmail);

    const student = await Student.findOne({ emailHash });
    if (!student) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, student.password);
    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const studentData = decryptBackendStudent(student.toObject());
    res.json({ message: 'Login successful', student: studentData });
  } catch (error: any) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};