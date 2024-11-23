// controllers/userController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Create new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    // Generate a JWT token for the created user
    const token = jwt.sign({ user: { id: user._id, role: user.role } }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send back the token in the response
    res.status(201).json({
      message: 'User created successfully',
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get all Admins (Admin-only)
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'Admin' });
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get all Teachers (Admin-only)
export const getAllTeachers = async (req, res) => {
  try {
    // Query for teachers
    const teachers = await User.find({ role: 'Teacher' });
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get all Students (Admin and Teacher)
export const getAllStudents = async (req, res) => {
  try {
    // Query for students
    const students = await User.find({ role: 'Student' });
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

