import express from 'express';
import {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  loginStudent
} from '../controllers/studentController';

const router = express.Router();
console.log('studentRoutes loaded')

// Student routes
router.post('/register', createStudent);
router.post('/login', loginStudent);
router.get('/students', getAllStudents);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);

// (actual register handled above)

export default router;