import { error } from "console";
import User from "../models/User.js";

export const isAdmin = (req, res, next) => {
    try {
      if (req.user && req.user.role === 'Admin') {
        return next();
      }
      return res.status(403).json({ error: 'Access Denied: Admins only.' });
    } catch (error) {
        console.log(error)
      return res.status(500).json({ error: 'Internal server error.' });
    }
};

export const isAdminOrTeacher = (req, res, next) => {
    try {
      if (req.user.role === 'Admin' || req.user.role === 'Teacher') {
        return next();
      }
      return res.status(403).json({ error: 'Access Denied: Admins or Teachers only.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  };
  