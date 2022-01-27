import mongoose from "mongoose";

const LengthOfInterviewSchema = mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("LengthOfInterview", LengthOfInterviewSchema);
