import express from "express";
import ProductController from "../controllers/product.controller";
import upload from "../middleware/upload.middleware";

const router = express.Router();

router
  .route("/")
  .get(ProductController.getAllProducts)  
  .post(upload.single('image'), ProductController.createProduct); 


router
  .route("/:ProductId")
  .get(ProductController.getProductById)  
  .put(upload.single("image"), ProductController.updateProduct) 
  .delete(ProductController.deleteProduct);

export default router;
