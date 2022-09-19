import mongoose from "mongoose";

const { Schema } = mongoose;

const SalesSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  productName: { type: String, required: true }, // admin, owner, attendant
  quantity: Number,
  total: Number,
});

export default mongoose.model("Sales", SalesSchema);
