import mongoose from "mongoose";

const AMHISchema = mongoose.Schema(
  {
    average: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AMHI", AMHISchema);
