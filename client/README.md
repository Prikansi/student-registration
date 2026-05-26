# Student Management System

A secure Student Management System built using React, TypeScript, Node.js, Express, and MongoDB.

# Installation & Setup Guide

Follow the steps below to run this project locally on your machine.

---

# Prerequisites

Make sure the following software is installed on your system:

- Node.js
- Git
- MongoDB Community Server

---

# 1. Clone Repository

```bash
git clone https://github.com/Prikansi/student-registration.git
```

Move into the project folder:

```bash
cd student-registration
```

---

# 2. Backend Setup

Move into server folder:

```bash
cd server
```

Install backend dependencies:

```bash
npm install
```

---

# 3. Create Backend Environment Variables

Create a `.env` file inside the `server` folder.

### server/.env

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/student-encrypted-db
```

---

# 4. Start MongoDB Service

Make sure MongoDB service is running.

### Windows

```bash
net start MongoDB
```

---

# 5. Run Backend Server

Inside `server` folder run:

```bash
npm run dev
```

Backend server runs at:

```bash
http://localhost:5000
```

---

# 6. Frontend Setup

Open a new terminal.

Move into client folder:

```bash
cd client
```

Install frontend dependencies:

```bash
npm install
```

---

# 7. Create Frontend Environment Variables

Create a `.env` file inside the `client` folder.

### client/.env

```env
VITE_BASEURL=http://localhost:5000
```

---

# 8. Run Frontend Application

Inside `client` folder run:

```bash
npm run dev
```

Frontend application runs at:

```bash
http://localhost:5173
```

---

# 9. Open Application

Open browser and visit:

```bash
http://localhost:5173
```
+=====================================================================================
---

# Common Errors & Fixes

## MongoDB Connection Error

Make sure MongoDB service is running properly.

---

## Port Already In Use

Change backend port inside:

### server/.env

```env
PORT=5001
```

Then update frontend `.env`:

### client/.env

```env
VITE_BASEURL=http://localhost:5001
```

---

## npm install Hanging   (Use below command only in case of npm installation is hanging)

Try:

```bash
npm install --legacy-peer-deps
```

or:

```bash
npm cache clean --force
```

---

## Cannot Find Module Error

Install missing package manually.

Example:

```bash
npm install qs
```

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