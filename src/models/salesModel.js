import mongoose from "mongoose";

const { Schema } = mongoose;

const SalesSchema = new Schema({
  sold_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // unit price and product name category name
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity_Sold: Number,
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Sales", SalesSchema);
