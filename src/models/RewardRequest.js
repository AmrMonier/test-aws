import mongoose from "mongoose";

const RewardRequestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    reward: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Reward",
      required: true,
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: "pending",
    },
    promoCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("RewardRequest", RewardRequestSchema);
