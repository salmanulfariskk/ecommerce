import { Request, Response } from "express";
import Product from "../models/product.model";
import { HttpStatus, ResponseMessage } from "../utils/constants";

const ProductController = {
    async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await Product.find();
            res.status(HttpStatus.OK).json({ success: true, message: ResponseMessage.GET_ALL_PRODUCT, data: products });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.SERVER_ERROR, error });
        }
    },

    async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const product = await Product.findById(req.params.ProductId);
            if (!product) {
                res.status(HttpStatus.NOT_FOUND).json({ message: ResponseMessage.PRODUCT_NOT_FOUND });
                return
            }
            res.status(HttpStatus.OK).json({ success: true, messae: ResponseMessage.GET_ONE_PRODUCT, data: product });
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.SERVER_ERROR, error });
        }
    },

    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const { title, price, description, category, rating } = req.body;
            const imageUrl = `${process.env.IMAGE_SAVE}${req.file?.filename}`;
            const newProduct = new Product({ title, price, description, category, rating, imageUrl });
            await newProduct.save();

            res.status(HttpStatus.CREATED).json({ success: true, message: ResponseMessage.PRODUCT_ADDED, data: newProduct });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.SERVER_ERROR, error });
        }
    },

    async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const { name, price, description } = req.body;
            let image
            if (req.file) {
                image = `${process.env.IMAGE_SAVE}+${req.file?.filename}`
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.ProductId,
                { name, price, description, ...(image && { image }) },
                { new: true }
            );

            if (!updatedProduct) {
                res.status(HttpStatus.NOT_FOUND).json({ message: ResponseMessage.PRODUCT_NOT_FOUND });
                return
            }
            res.status(HttpStatus.OK).json({ success: true, message: ResponseMessage.PRODUCT_EDITED, data: updatedProduct });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.SERVER_ERROR, error });
        }
    },

    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.ProductId);
            if (!deletedProduct) {
                res.status(HttpStatus.NOT_FOUND).json({ message: ResponseMessage.PRODUCT_NOT_FOUND });
                return
            }
            res.status(HttpStatus.OK).json({ success: true, message: ResponseMessage.PRODUCT_DELETED });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: ResponseMessage.SERVER_ERROR, error });
        }
    }
};

export default ProductController;
