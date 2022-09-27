import { Router } from "express";
import ProductController from "../../controllers/products.js";

const router = Router();
// fetch all products
router.get("/", ProductController.getAllProducts);

// fetch a single product
router.get("/:id", ProductController.getProductsGivenId);

// Create a product
router.post("/", ProductController.createProducts);

export default router;
