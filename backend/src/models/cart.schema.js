const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product ID is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
        default: 1,
    },
});

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        items: {
            type: [cartItemSchema], // can be an empty array
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// Optional: prevent duplicate products in cart for the same user

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
