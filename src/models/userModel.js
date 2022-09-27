import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    roles: {
      type: String,
      required: true,
      enum: ["owner", "attendant", "admin"],
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  // need created and updated
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
