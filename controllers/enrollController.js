import Enroll from '../models/Enroll.js';
import Practical from '../models/Practical.js';
import User from '../models/User.js';

export const enrollInPractical = async (req, res) => {
  try {
    const { practicalId, studentId } = req.body;

    // Ensure the studentId matches the logged-in user ID (if needed)
    if (req.user.id !== studentId) {
      return res.status(403).json({ error: 'You can only enroll yourself' });
    }

    // Validate practicalId and studentId
    const practical = await Practical.findById(practicalId);
    if (!practical) {
      return res.status(404).json({ error: 'Practical not found' });
    }

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await Enroll.findOne({ practicalId, studentId });
    if (existingEnrollment) {
      return res.status(400).json({ error: 'Student is already enrolled' });
    }

    // Create a new enrollment record
    const enrollment = new Enroll({
      practicalId,
      studentId,
    });

    await enrollment.save();
    res.json({ message: 'Student enrolled in practical successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
