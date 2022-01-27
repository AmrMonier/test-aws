import mongoose from 'mongoose';

const SampleSizeSchema = mongoose.Schema(
  {
    from: {
        type: Number,
        required: true
    },
    to: {
      type: Number,
      required: true
  },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('SampleSize', SampleSizeSchema);
