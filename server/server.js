import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
connectDB();

import path from 'path';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
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
app.use('/api/uploads', uploadRoutes);


app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.port}`
  )
);
