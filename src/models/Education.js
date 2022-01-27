import mongoose from "mongoose";

const EducationSchema = mongoose.Schema(
  {
    level: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Education", EducationSchema);
