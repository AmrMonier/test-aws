import mongoose from 'mongoose';

const RewardProviderSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('RewardProvider', RewardProviderSchema);
