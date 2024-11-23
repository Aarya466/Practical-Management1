/*import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");  // Extract token

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure that the decoded object contains the user info
    if (!decoded.user) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    // Attach the user information to req.user
    req.user = decoded.user;  // Ensure the decoded token contains a 'user' object
    next();  // Proceed to the next middleware or route
  } catch (error) {
    console.error("Authorization Error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default authMiddleware;*/

import jwt from "jsonwebtoken"; // Use import for ES module compatibility

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const authMiddleware = (req, res, next) => {
  try {
    // Extract token from Authorization header or query string
    const token =
      req.headers.authorization?.split(" ")[1] || req.query.token;

    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ error: "Authentication required. Token missing." });
    }

    // Verify token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the decoded token contains the user object
    if (!decoded.user) {
      return res.status(401).json({ error: "Invalid token format." });
    }

    // Attach the user info to the request object
    req.user = decoded.user;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    console.error("Authorization Error:", error.message);
    return res.status(401).json({
      error: "Invalid or expired token. Please log in again.",
    });
  }
};

export default authMiddleware;

///////////////////////3

/*import bcrypt from 'bcrypt'; // Import bcrypt to hash passwords

// A dummy function to simulate fetching the user from the database
const getUserByUsername = (username) => {
  // This should query the database to get the user by username
  // Replace this with actual database logic (using MongoDB, SQL, etc.)
  const users = [
    { username: 'admin', password: '$2b$10$WzSM.V44G78pdThQ3yIHRtG7l9e2aFF4EitV3HZCO/8vztF2ZFPHm' }, // Example hashed password
    { username: 'teacher', password: '$2b$10$L5.f9n7e5fYct3ydO2U56uWW8GjAmWZhG.vOBKztXo5k/EqiC4w.y' }  // Example hashed password
  ];

  return users.find(user => user.username === username);
};

const authMiddleware = async (req, res, next) => {
  const { username, password } = req.body; // Expecting username and password in request body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  // Fetch user from the database by username
  const user = getUserByUsername(username);

  if (!user) {
    return res.status(401).json({ error: 'User not found.' });
  }

  // Compare the provided password with the stored password (hashed password)
  try {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // Password matches, proceed to the next middleware or route
    req.user = user; // You can attach user information to req for further use
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    return res.status(500).json({ error: 'Server error during authentication.' });
  }
};

export default authMiddleware;*/

