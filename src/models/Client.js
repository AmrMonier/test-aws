import mongoose from "mongoose";

const ClientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: "$2b$10$Pfrcg2WBoxNZ/SHxELBTvOB8CfVtSF43hTdd6WeP.h7ycmDskyqq.", // password
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    
  },
  {
    timestamps: true,
  }
);

ClientSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

export default mongoose.model("Client", ClientSchema);
