import mongoose from "mongoose";

const SampleSizeRateCardSchema = mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    sampleSize: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "SampleSize",
      required: true,
    },
    incidenceRate: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "IncidenceRate",
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SampleSizeRateCard", SampleSizeRateCardSchema);
