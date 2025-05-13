import mongoose from "mongoose";
import plm from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(plm);

export default mongoose.model("User", userSchema);
