import express from 'express';
import { createPractical, getAllPracticals, enrollInPractical } from '../controllers/practicalController.js';

const router = express.Router();

// ========== Practical Routes ==========

// Create new practical
router.post('/practicals/create', createPractical);

// Get all practicals
router.get('/practicals/get', getAllPracticals);

// Enroll in practical
router.post('/practicals/enroll', enrollInPractical);

export default router;
