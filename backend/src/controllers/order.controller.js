const Order = require("../models/order.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllOrdersOfAllUsers = catchAsync(async function (req, res, next) {
    const orders = Order.find({});
    if (!orders.length) {
        return next(new AppError(404, "No orders found"));
    }

    res.status(200).json({
        status: "success",
        message: "Orders fetched successfully",
        data: {
            orders,
        },
    });
});

exports.getOrderDetailsForAdmin = catchAsync(async function (req, res, next) {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
        return next(new AppError(404, "Order not found"));
    }
    res.status(200).json({
        status: "success",
        message: "Order details fetched successfully",
        data: {
            order,
        },
    });
});

exports.updateOrderStatus = catchAsync(async function (req, res, next) {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const order = await Order.findById(id);
    if (!order) {
        return next(new AppError(404, "Order not found"));
    }

    await Order.findByIdAndUpdate(id, { orderStatus });
    res.status(200).json({
        status: "success",
        message: "Order status updated successfully",
    });
});
