import mongoose from "mongoose";

const { Schema } = mongoose;

const salesSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  productName: { type: String, required: true }, // admin, owner, attendant
  quantity: Number,
  total: Number,
});

export default salesModel = mongoose.model("Sales", salesSchema);
