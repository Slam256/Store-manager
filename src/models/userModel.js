import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  Role: { type: String, required: true }, // admin, owner, attendant
  Stock: Number,
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default userModel = mongoose.model("User", userSchema);
