# Student Management System

A secure Student Management System built using React, TypeScript, Node.js, Express, and MongoDB.

.env backend(server) file-________________________________

PORT=8000
MONGO_URI=mongodb+srv://prikansi:Priks%402000@cluster0.m1erevu.mongodb.net/?appName=Cluster0

.env frontend(Client)

VITE_BASEURL=http://localhost:8000

# Backend Setup

1. Install Node.js
2. Install MongoDB locally
3. Start MongoDB service
4. Create .env file

PORT=5000
MONGO_URI=mongodb://localhost:27017/student-encrypted-db


5. Run:

npm install
npm run dev

---

# Features

- Secure student registration and login
- Two-layer AES encryption for sensitive data
- Deterministic email hashing for authentication
- CRUD operations for student records
- Toast notifications for success and error feedback
- Session persistence across refresh
- React Query integration for API state management

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Axios
- TanStack React Query
- React Hot Toast
- Tailwind CSS
- crypto-js

## Backend

- Node.js
- Express
- TypeScript
- Mongoose
- bcryptjs
- crypto-js

## Database

- MongoDB

---

# Project Structure

```bash
student-registration/
│
├── client/          # Frontend React App
├── server/          # Backend Node/Express API
└── README.md
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/Prikansi/student-registration.git
cd task-react-node-typescript
```

---

## 2. Install Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd ../server
npm install
```

---

# Environment Variables

Create a `.env` file inside the `server` folder.

## server/.env

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/student-encrypted-db
```

---

# Run the Project

## Start Backend Server

```bash
cd server
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## Start Frontend App

```bash
cd client
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register a new student |
| POST | `/api/login` | Login student |
| GET | `/api/students` | Fetch all students |
| PUT | `/api/student/:id` | Update student details |
| DELETE | `/api/student/:id` | Delete student |

---

# Authentication & Encryption Flow

This project uses a secure two-layer encryption strategy for protecting student data.

## 1. Frontend Encryption

Sensitive fields such as:

- Full Name
- Email
- Phone Number
- Address

are encrypted using AES encryption before being sent to the backend.

This ensures plaintext data is never transmitted directly.

---

## 2. Backend Encryption

The backend:

1. Decrypts frontend-encrypted data
2. Re-encrypts the data using another AES secret key
3. Stores encrypted values in MongoDB

This provides double-layer security.

---

## 3. Deterministic Email Hashing

AES encryption generates different encrypted values each time because it uses random salts/IVs.

To support login lookup:

- Backend decrypts the email
- Generates a SHA256 hash
- Stores it in `emailHash`

During login:

1. Email is decrypted
2. SHA256 hash is generated again
3. Student is searched using `emailHash`

---

## 4. Password Security

Passwords are securely hashed using `bcryptjs`.

- Plaintext passwords are never stored
- Password verification uses bcrypt compare

---

# Frontend Features

- Student Registration
- Student Login
- Student CRUD Operations
- Search Students
- React Query API Integration
- Toast Notifications
- Loading States
- Form Validation

---

# Backend Features

- REST API with Express
- MongoDB Integration using Mongoose
- Secure Encryption Utilities
- Password Hashing
- Authentication Handling
- Error Handling Middleware

---

# Screenshots

## Login Page

_Add screenshot here_

---

## Student Dashboard

_Add screenshot here_

---

## Student Form

_Add screenshot here_

---

# Future Improvements

- JWT Authentication
- Role-based Authorization
- Pagination
- File Uploads
- Profile Photos
- Dark Mode
- Unit Testing
- Docker Deployment

---

# Author

## Prikansi

GitHub Repository:

https://github.com/Prikansi/student-registration