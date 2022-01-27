import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
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
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true
    },
    points: { type: Number, default: 0 },
    isRestricted: {
      type: Boolean,
      default: false,
    },
    otp: {
      code: {
        type: String,
      },
      expireation: {
        type: Date,
        default: Date.now() + 1 * 60 * 60 * 1000
      }
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
UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  delete obj.otp;
  return obj;
};
export default mongoose.model("User", UserSchema);
