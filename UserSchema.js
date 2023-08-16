import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  followers: Number,
  following: Array,
});

export default mongoose.model("user", UserSchema);
