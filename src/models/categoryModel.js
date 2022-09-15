import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

export default categoryModel = mongoose.model("Category", categorySchema);
