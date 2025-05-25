const Product = require("../models/product.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getFilteredProducts = catchAsync(async function (req, res, next) {
    const { category = "", brand = "", sortBy = "price-lowtohigh" } = req.query;

    const categoryArray = category ? category.split(",") : [];
    const brandArray = brand ? brand.split(",") : [];

    let filter = {};

    if (categoryArray.length > 0) {
        filter.category = { $in: categoryArray };
    }

    if (brandArray.length > 0) {
        filter.brand = { $in: brandArray };
    }

    const sortOptions = {
        "price-lowtohigh": { price: 1 },
        "price-hightolow": { price: -1 },
        "title-atoz": { title: 1 },
        "title-ztoa": { title: -1 },
    };
    const sort = sortOptions[sortBy.toLowerCase()] || { price: 1 };

    const products = await Product.find(filter).sort(sort);
    res.status(200).json({
        status: "success",
        message: "Products fetched successfully",
        data: {
            products,
        },
    });
});

exports.getProductDetails = catchAsync(async function (req, res, next) {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError(404, "Product not found"));
    }
    res.status(200).json({
        status: "success",
        message: "Product fetched successfully",
        data: {
            product,
        },
    });
});

exports.getSearchProducts = catchAsync(async function (req, res, next) {
    const { keyword } = req.params;
    if (!keyword) {
        return next(new AppError(400, "Please provide a keyword to search."));
    }

    const regEx = new RegExp(keyword, "i");

    const filter = {
        $or: [
            { title: regEx },
            { description: regEx },
            { category: regEx },
            { brand: regEx },
        ],
    };

    const searchProducts = await Product.find(filter);
    res.status(200).json({
        status: "success",
        message: "Products fetched successfully",
        data: {
            products: searchProducts,
        },
    });
});
