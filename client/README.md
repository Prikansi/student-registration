# Student Management System

A secure Student Management System built with React, TypeScript, Node.js, Express, and MongoDB.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd task-react-node-typescript
   ```
2. Install dependencies for both apps:
   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```
3. Create a MongoDB database and update `server/.env` if needed.
4. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```
5. Start the frontend app:
   ```bash
   cd ../client
   npm run dev
   ```

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Vite
  - Axios
  - TanStack React Query
  - React Hot Toast
  - crypto-js
- Backend:
  - Node.js
  - Express
  - TypeScript
  - Mongoose
  - bcryptjs
  - crypto-js
- Database:
  - MongoDB

## How Encryption is Implemented

This project uses a two-layer encryption strategy for student personal data:

1. **Frontend encryption**
   - Sensitive fields (`fullName`, `email`, `phoneNumber`, `address`) are encrypted using AES before being sent to the backend.
   - This ensures that plaintext values are never transmitted directly.

2. **Backend encryption**
   - The backend decrypts the frontend-encrypted values, then re-encrypts them with a second AES key.
   - Encrypted data is stored in MongoDB, while the backend keeps the encryption secret.

3. **Deterministic login lookup**
   - Because AES encryption includes a random IV/salt, the same plaintext encrypts differently each time.
   - The backend computes a deterministic SHA256 hash of the decrypted email and stores it in the `emailHash` field.
   - During login, the backend decrypts the frontend email, hashes it, and searches by `emailHash`.

4. **Password hashing**
   - Passwords are hashed using `bcryptjs` before storage.
   - Plaintext passwords are never stored.

## API Endpoints

- `POST /api/register` — register a new student
- `POST /api/login` — login a student
- `GET /api/students` — fetch all students
- `PUT /api/student/:id` — update student details
- `DELETE /api/student/:id` — delete a student

## Project Features

- Secure student registration and login
- Two-layer AES encryption for sensitive data
- Deterministic email hashing for authentication
- CRUD operations for student records
- Toast notifications for success and error feedback
- Session persistence across refresh

## Sample Screenshots

