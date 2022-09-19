import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  unitPrice: Number,
  quantity: Number,
  // categoryName: {
  //   type: String,
  // },
});

export default mongoose.model("Product", ProductSchema);
