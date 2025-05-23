const mongoose = require("mongoose");

const productReviewSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product ID is required"],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        userName: {
            type: String,
            required: [true, "User name is required"],
            trim: true,
            minlength: [2, "User name must be at least 2 characters"],
            minlength: [50, "User name must be at least 50 characters"],
        },
        reviewMessage: {
            type: String,
            trim: true,
            maxlength: [1000, "Review message cannot exceed 1000 characters"],
        },
        reviewValue: {
            type: Number,
            required: [true, "Review value is required"],
            min: [1, "Review must be at least 1"],
            max: [5, "Review must be at most 5"],
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model("Review", productReviewSchema);

module.exports = Review;
