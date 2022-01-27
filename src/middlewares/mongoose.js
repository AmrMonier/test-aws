import { config } from "dotenv";
config();
import mongoose from "mongoose";
function connect() {
  return mongoose.connect(process.env.MONGO_URI);
}
export default { connect };
