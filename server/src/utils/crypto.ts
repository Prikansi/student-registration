import crypto from 'crypto-js';

// Frontend and backend encryption keys
const FRONTEND_ENCRYPTION_KEY = 'frontend-secret-key-2024';
const BACKEND_ENCRYPTION_KEY = 'backend-secret-key-2024';

export const encryptFrontendData = (data: string): string => {
  return crypto.AES.encrypt(data, FRONTEND_ENCRYPTION_KEY).toString();
};

export const decryptFrontendData = (encryptedData: string): string => {
  const bytes = crypto.AES.decrypt(encryptedData, FRONTEND_ENCRYPTION_KEY);
  return bytes.toString(crypto.enc.Utf8);
};

export const encryptBackendData = (data: string): string => {
  return crypto.AES.encrypt(data, BACKEND_ENCRYPTION_KEY).toString();
};

export const decryptBackendData = (encryptedData: string): string => {
  const bytes = crypto.AES.decrypt(encryptedData, BACKEND_ENCRYPTION_KEY);
  return bytes.toString(crypto.enc.Utf8);
};

// Hash email for database lookup (deterministic)
export const hashEmail = (email: string): string => {
  return crypto.SHA256(email).toString();
};

// Encrypt sensitive fields before storing in MongoDB (backend second layer)
export const encryptStudentData = (studentData: any): any => {
  const encrypted = { ...studentData };
  encrypted.fullName = encryptBackendData(studentData.fullName);
  encrypted.email = encryptBackendData(studentData.email);
  encrypted.phoneNumber = encryptBackendData(studentData.phoneNumber);
  encrypted.address = encryptBackendData(studentData.address);
  return encrypted;
};

// Decrypt backend-encrypted fields before sending to frontend
export const decryptStudentData = (studentData: any): any => {
  const decrypted = { ...studentData };
  decrypted.fullName = decryptBackendData(studentData.fullName);
  decrypted.email = decryptBackendData(studentData.email);
  decrypted.phoneNumber = decryptBackendData(studentData.phoneNumber);
  decrypted.address = decryptBackendData(studentData.address);
  return decrypted;
};