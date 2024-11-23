import Practical from '../models/Practical.js';

// Create new practical
export const createPractical = async (req, res) => {
  try {
    const { subjectId, title, description } = req.body;

    // Creating new practical instance
    const practical = new Practical({
      subjectId,
      title,
      description,
      createdBy: req.user.id, // Make sure `req.user.id` exists from the JWT token
    });

    // Save the practical in the database
    await practical.save();
    res.json({ message: 'Practical created successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};

// Get all practicals
export const getAllPracticals = async (req, res) => {
  try {
    const practicals = await Practical.find().populate('enrolledStudents');
    res.json(practicals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Enroll in practical
export const enrollInPractical = async (req, res) => {
  try {
    const { practicalId, studentId } = req.body;

    // Find the practical document by its ID
    const practical = await Practical.findById(practicalId);
    if (!practical) {
      return res.status(404).json({ error: 'Practical not found' }); // Handle if practical doesn't exist
    }

    // Ensure enrolledStudents field exists and is an array
    if (!practical.enrolledStudents) {
      practical.enrolledStudents = []; // Initialize enrolledStudents if not present
    }

    // Add the student to the enrolledStudents array
    practical.enrolledStudents.push(studentId);

    // Save the practical with the updated enrolledStudents array
    await practical.save();
    res.json({ message: 'Student enrolled in practical successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};
