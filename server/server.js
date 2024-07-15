import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
connectDB();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from './routes/orderRoutes.js';
import { UserRouter } from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", UserRouter);
app.use('/api/orders', orderRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(process.env.port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.port}`
  )
);
