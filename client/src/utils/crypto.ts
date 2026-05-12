import crypto from 'crypto-js';

// Frontend encryption key (should be in environment variables in production)
const FRONTEND_ENCRYPTION_KEY = 'frontend-secret-key-2024';

export const encryptData = (data: string): string => {
  return crypto.AES.encrypt(data, FRONTEND_ENCRYPTION_KEY).toString();
};

export const decryptData = (encryptedData: string): string => {
  try {
    const bytes = crypto.AES.decrypt(encryptedData, FRONTEND_ENCRYPTION_KEY);
    const decrypted = bytes.toString(crypto.enc.Utf8);
    return decrypted || encryptedData;
  } catch (err) {
    return encryptedData;
  }
};

// Encrypt data before sending to backend
export const encryptStudentData = (studentData: any): any => {
  const encrypted = { ...studentData };
  encrypted.fullName = encryptData(studentData.fullName);
  encrypted.email = encryptData(studentData.email);
  encrypted.phoneNumber = encryptData(studentData.phoneNumber);
  encrypted.address = encryptData(studentData.address);
  return encrypted;
};

// Decrypt data received from backend - handles both encrypted and non-encrypted
export const decryptStudentData = (studentData: any): any => {
  const decrypted = { ...studentData };
  
  // Check if data is encrypted (starts with "U2FsdGVkX1")
  const isEncrypted = (data: string) => typeof data === 'string' && data.startsWith('U2FsdGVkX1');
  
  if (isEncrypted(studentData.fullName)) {
    decrypted.fullName = decryptData(studentData.fullName);
  }
  
  if (isEncrypted(studentData.email)) {
    decrypted.email = decryptData(studentData.email);
  }
  
  if (isEncrypted(studentData.phoneNumber)) {
    decrypted.phoneNumber = decryptData(studentData.phoneNumber);
  }
  
  if (isEncrypted(studentData.address)) {
    decrypted.address = decryptData(studentData.address);
  }
  
  return decrypted;
};