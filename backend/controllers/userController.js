import User from '../models/User.js';

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User profile created', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'User profile updated', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsersBySkill = async (req, res) => {
  try {
    const users = await User.find({ skillsOffered: req.params.skill });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleProfileVisibility = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isPublic = !user.isPublic;
    await user.save();
    res.status(200).json({ message: 'Profile visibility toggled', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add these functions to match route expectations

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const makeProfilePublicOrPrivate = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.isPublic = !user.isPublic;
    await user.save();
    res.status(200).json({ message: 'Visibility toggled', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { skillsOffered: { $regex: q, $options: 'i' } }
      ]
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
