import mongoose from "mongoose";

const TokensSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    expiration: {
      type: Date,
      default: Date.now() + 4 * 60 * 60 * 1000, // expires after 4 hours
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true
    },
    type: {
      type: String,
      enum: ['verification', 'reset']
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tokens", TokensSchema);
