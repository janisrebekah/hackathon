import User from '../models/User.js';
import SwapRequest from '../models/Swap.js';

export const banUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { banned: true });
    res.status(200).json({ message: 'User banned' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendAnnouncement = async (req, res) => {
  try {
    // Placeholder: broadcast message logic
    res.status(200).json({ message: 'Announcement sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStatsReport = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const swapsCount = await SwapRequest.countDocuments();
    res.status(200).json({ userCount, swapsCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approveUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found 😔' });
    }

    res.status(200).json({ message: '✅ User profile approved', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to fetch users', error: err.message });
  }
};