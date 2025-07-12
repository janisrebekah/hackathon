import mongoose from 'mongoose';

const adminLogSchema = new mongoose.Schema({
  actionType: {
    type: String,
    enum: ['ban_user', 'unban_user', 'remove_skill', 'send_notice'],
    required: true
  },
  targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: { type: String },
  createdBy: { type: String, default: 'system' } // or admin username
}, { timestamps: true });

export default mongoose.model('AdminLog', adminLogSchema);
