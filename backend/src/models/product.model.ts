import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
    _id: Types.ObjectId;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    rating: number;
}

const ProductSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        imageUrl: { type: String, required: true }, 
        category: { type: String, required: true },
        rating: { type: Number, required: true}, 
    },
    { timestamps: true } 
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
