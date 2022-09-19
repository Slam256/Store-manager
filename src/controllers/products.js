import Product from "../models/productModel";

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (e) {
      res.json(e.message);
    }
  }

  static async getProductsGivenId(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id).exec();
      if (product === null) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json(product);
      }
    } catch (e) {
      res.json(e.message);
    }
  }

  static async createProducts(req, res) {
    try {
      const { productName, unitPrice, quantity } = req.body;
      const product = {
        productName,
        unitPrice,
        quantity,
      };

      await Product.create(product);

      return res.status(201).json({ message: "Product added successfully" });
    } catch (e) {
      return res.status(400).json({ message: e });
    }
  }
}

export default ProductController;
