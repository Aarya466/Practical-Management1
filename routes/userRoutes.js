import express from 'express';
import { 
  createUser, 
  getAllUsers, 
  getAllAdmins, 
  getAllTeachers, 
  getAllStudents 
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';
import { isAdmin, isAdminOrTeacher } from '../middlewares/roleValidation.js';

const router = express.Router();

// ========== User Routes ==========

// Create a new user (accessible to all)
router.post('/create', createUser);

// Get all users (Admin-only)
router.get('/get', authMiddleware, isAdmin, getAllUsers);

// Get all Admins (Admin-only)
router.get('/admins', authMiddleware, isAdmin, getAllAdmins);

// Get all Teachers (Admin-only)
router.get('/teachers', authMiddleware, isAdmin, getAllTeachers);

// Get all Students (Admin and Teacher-only)
router.get('/students', authMiddleware, isAdminOrTeacher, getAllStudents);

export default router;
