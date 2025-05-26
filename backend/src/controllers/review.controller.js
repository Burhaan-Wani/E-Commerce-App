const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Review = require("../models/productReview.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { reviewSchema } = require("../utils/zod/review.schema");
const handleZodError = require("../utils/zod/zodError");

exports.addProductReview = catchAsync(async function (req, res, next) {
    const data = handleZodError(req, next, reviewSchema);
    if (!data) return;

    const { userId, productId, reviewMessage, reviewValue } = data;
    const order = await Order.findOne({
        userId,
        "cartItems.productId": productId,
    });

    if (!order) {
        return next(
            new AppError(404, "you need to purchase product to review it.")
        );
    }

    const checkExistingReview = await Review.findOne({ productId, userId });

    if (checkExistingReview) {
        return next(new AppError(400, "You already reviewed this product"));
    }

    const review = await Review.create({
        userId,
        productId,
        userName: req.user.userName,
        reviewMessage,
        reviewValue,
    });

    const reviews = await Review.find({ productId });
    const totalReviews = reviews.length;
    const averageReview =
        reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        totalReviews;

    await Product.findByIdAndUpdate(productId, { averageReview });
    res.status(201).json({
        status: "success",
        message: "Review created successfully",
        data: {
            review,
        },
    });
});

exports.getProductReviews = catchAsync(async function (req, res, next) {
    const { productId } = req.params;
    const reviews = await Product.find({ productId });

    res.status(200).json({
        status: "success",
        message: "Reviews fetched successfully",
        data: {
            reviews,
        },
    });
});
