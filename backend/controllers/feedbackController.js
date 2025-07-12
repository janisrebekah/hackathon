import Feedback from '../models/Feedback.js';

export const submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    const saved = await feedback.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getFeedbackForUser = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ toUser: req.params.userId });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
