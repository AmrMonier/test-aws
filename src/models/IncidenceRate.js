import mongoose from "mongoose";

const IncidenceRateSchema = mongoose.Schema(
  {
    rate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("IncidenceRate", IncidenceRateSchema);
