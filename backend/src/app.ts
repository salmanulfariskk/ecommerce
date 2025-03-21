import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongooseError } from "mongoose";
import productRoute from "./routes/product.route"
import connectDB from "./utils/db.utils";
import path from "path";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/products", productRoute);


connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err :MongooseError) => {
    console.error("❌ Database connection failed:", err);
  });



  
export default app;
