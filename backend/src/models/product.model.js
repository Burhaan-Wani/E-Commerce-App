const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: [true, "Product image is required"],
        },
        title: {
            type: String,
            required: [true, "Product title is required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Product title is required"],
            maxlength: [1000, "Description cannot exceed 1000 characters"],
        },
        category: {
            type: String,
            enum: ["electronics", "clothing", "books", "furniture", "others"],
        },
        brand: {
            type: String,
            required: [true, "Brand is required"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price must be a positive number"],
        },
        salePrice: {
            type: Number,
            min: [0, "Sale price must be a positive number"],
            validate: {
                validator: function (val) {
                    return val <= this.price;
                },
                message: "Sale price cannot exceed the original price",
            },
        },
        totalStock: {
            type: Number,
            required: [true, "Total stock is required"],
            min: [0, "Stock cannot be negative"],
        },
        averageReview: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
