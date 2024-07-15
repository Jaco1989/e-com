import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';


const addOrderItems = asyncHandler(async (req, res) => {
  res.send("Add my Orders")
});


const getMyOrders = asyncHandler(async (req, res) => {
    res.send("get my Orders")
});


const getOrderById = asyncHandler(async (req, res) => {
    res.send("get my Order")
});


const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send("update order to paid")
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send("update order to delivered")
});

const getOrders = asyncHandler(async (req, res) => {
  res.send("get cutomers orders")
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};