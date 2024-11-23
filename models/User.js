// models/User.js
import mongoose from 'mongoose';


// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'Teacher', 'Student'], // Add valid roles
  },
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the model
export default User;
