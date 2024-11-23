// models/Subject.js
import mongoose from 'mongoose';

// Define the Subject schema
const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// Create the Subject model from the schema
const Subject = mongoose.model('Subject', subjectSchema);

// Export the model
export default Subject;
