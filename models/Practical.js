// models/Practical.js
import mongoose from 'mongoose';

// Define the Practical schema
const practicalSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// Create the Practical model from the schema
const Practical = mongoose.model('Practical', practicalSchema);

// Export the model
export default Practical;
