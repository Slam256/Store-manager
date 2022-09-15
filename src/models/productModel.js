import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  unitPrice: Number,
  Stock: Number,
  categoryName: {
    type: String,
  },
});

export default productModel = mongoose.model("Product", productSchema);
