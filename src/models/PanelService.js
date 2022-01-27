import mongoose from "mongoose";

const PanelServiceSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PanelService", PanelServiceSchema);
