const Product = require("../models/product.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const fileUpload = require("../utils/fileUpload");
const {
    productSchema,
    productUpdateSchema,
} = require("../utils/zod/product.schema");
const handleZodError = require("../utils/zod/zodError");

exports.handleImageUpload = catchAsync(async function (req, res, next) {
    const response = await fileUpload(req.file);
    res.status(200).json({
        status: "success",
        message: "Image uploaded successfully",
        data: {
            image: response.secure_url,
        },
    });
});

exports.addProduct = catchAsync(async function (req, res, next) {
    const data = handleZodError(req, next, productSchema);
    if (!data) return;

    const product = await Product.create(data);
    res.status(201).json({
        status: "success",
        message: "Product added successfully",
        data: {
            product,
        },
    });
});

exports.getAllProducts = catchAsync(async function (req, res, next) {
    const products = await Product.find({});
    res.status(200).json({
        status: "success",
        message: "Products fetched successfully",
        data: {
            products,
        },
    });
});

exports.editProduct = catchAsync(async function (req, res, next) {
    const { id } = req.params;

    const data = handleZodError(req, next, productUpdateSchema);
    if (!data) return;

    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError(404, "Product not found"));
    }
    Object.assign(product, data);
    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
    });
});

exports.deleteProduct = catchAsync(async function (req, res, next) {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError("404", "Product not found"));
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({
        success: "success",
        message: "Product deleted successfully",
    });
});
