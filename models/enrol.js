import mongoose from 'mongoose';

// Define the Enrollment schema
export const enrollSchema = new mongoose.Schema({
  practicalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Practical',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Enrollment model from the schema
const Enroll = mongoose.model('Enroll', enrollSchema);

// Export the model
export default Enroll;
