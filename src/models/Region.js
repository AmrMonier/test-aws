import mongoose from "mongoose";

const RegionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Country",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Region", RegionSchema);
