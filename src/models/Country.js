import mongoose from "mongoose";

const CountrySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rateCard: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Country", CountrySchema);
