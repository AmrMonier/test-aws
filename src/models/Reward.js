import mongoose from "mongoose";

const RewardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
    },
    provider: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "RewardProvider",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Reward", RewardSchema);
