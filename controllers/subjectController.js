// controllers/subjectController.js

import Subject from '../models/Subject.js';

// Create new subject
export const createSubject = async (req, res) => {
  try {
    const { name, code } = req.body;
    const subject = new Subject({
      name,
      code,
      createdBy: req.user.id,  // Assuming user is authenticated
    });
    await subject.save();
    res.json({ message: 'Subject created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all subjects
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
