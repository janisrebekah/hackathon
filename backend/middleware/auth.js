import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 🔐 Middleware to check if a user is authenticated
export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expected format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: '🔒 Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found. Please re-authenticate.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: '❌ Invalid or expired token.' });
  }
};

// 🛡️ Middleware to check if the user is an admin
export const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: '🚫 Forbidden. Admin access required.' });
  }
  next();
};
