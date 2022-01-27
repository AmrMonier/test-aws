import mongoose from "mongoose";

const RateCardSchema = mongoose.Schema(
  {
    number: {
      type: Number,
      required: true
    },
    loi: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'LengthOfInterview',
      required: true
    },
    incidenceRate: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'IncidenceRate',
      required: true
    },
    value: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("RateCard", RateCardSchema);
