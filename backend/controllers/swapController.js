// backend/controllers/swapController.js
import SwapRequest from '../models/Swap.js';

// 📦 Create a new swap request
export const createSwapRequest = async (req, res) => {
  try {
    const swap = new SwapRequest(req.body);
    await swap.save();
    res.status(201).json({ message: 'Swap request created', swap });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 👤 Get swaps requested by the logged-in user
export const getUserSwaps = async (req, res) => {
  try {
    const swaps = await SwapRequest.find({ requesterId: req.user._id });
    res.status(200).json(swaps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📨 Get swap requests received (e.g., for a skill you offer)
export const getSwapRequests = async (req, res) => {
  try {
    const swaps = await SwapRequest.find({ targetUserId: req.user._id });
    res.status(200).json(swaps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Accept a swap
export const acceptSwap = async (req, res) => {
  try {
    const swap = await SwapRequest.findByIdAndUpdate(req.params.swapId, { status: 'accepted' }, { new: true });
    res.status(200).json({ message: 'Swap accepted', swap });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Reject a swap
export const rejectSwap = async (req, res) => {
  try {
    const swap = await SwapRequest.findByIdAndUpdate(req.params.swapId, { status: 'rejected' }, { new: true });
    res.status(200).json({ message: 'Swap rejected', swap });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑️ Delete a swap
export const deleteSwap = async (req, res) => {
  try {
    await SwapRequest.findByIdAndDelete(req.params.swapId);
    res.status(200).json({ message: 'Swap request deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ⭐ Rate a completed swap
export const rateSwap = async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    const swap = await SwapRequest.findByIdAndUpdate(
      req.params.swapId,
      { rating, feedback },
      { new: true }
    );
    res.status(200).json({ message: 'Swap rated', swap });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
