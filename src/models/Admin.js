import mongoose from "mongoose";

const AdminSchema =  mongoose.Schema(
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
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};
// this check first if the Admin model already exists 
// to avoid multiple compilation of the Model
export default  mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
