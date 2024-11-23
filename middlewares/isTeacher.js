import { error } from "console";
import User from "../models/User.js";

export const isTeacher = async (req, res, next) => {
  try {
    const { id } = req.user; // Extract user ID from `req.user` set by `authMiddleware`

    const user = await User.findById(id); // Fetch user from DB
    if (user && user.role === "Teacher") {
      next(); // Proceed if the user is a Teacher
    } else {
      console.log(error);
      res.status(403).json({ error: "Unauthorized access. Only teachers can perform this action." });
      
    }
  } catch (error) {
    console.error("Authorization Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
