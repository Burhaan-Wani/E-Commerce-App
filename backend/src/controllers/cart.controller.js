const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const cartSchema = require("../utils/zod/cart.schema");
const handleZodError = require("../utils/zod/zodError");

exports.addToCart = catchAsync(async function (req, res, next) {
    const data = handleZodError(req, next, cartSchema);
    if (!data) return;

    const { userId, productId, quantity } = data;
    const product = await Product.findById(productId);
    if (!product) {
        return next(new AppError(404, "Product not found"));
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
        cart.items.push({ productId, quantity });
    } else {
        cart.items[itemIndex].quantity += quantity;
    }
    await cart.save();
    res.status(200).json({
        status: "success",
        message: "Item added to cart successfully",
        data: {
            cart,
        },
    });
});

exports.fetchCartItems = catchAsync(async function (req, res, next) {
    const { userId } = req.params;
    if (!userId) {
        return next(new AppError(400, "User id is mandatory"));
    }

    const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "image title price salePrice",
    });
    if (!cart) {
        return next(new AppError(404, "Cart not found"));
    }

    const validItems = cart?.items.filter(productItem => productItem.productId);

    if (validItems.length < cart.items) {
        cart.items = validItems;
        await cart.save();
    }

    const populateCartItems = validItems.map(item => ({
        productId: item.productId._id,
        image: item.productId.image,
        title: item.productId.title,
        price: item.productId.price,
        salePrice: item.productId.salePrice,
        quantity: item.quantity,
    }));

    res.status(200).json({
        success: "success",
        message: "Cart items fetched successfully",
        data: {
            ...cart._doc,
            items: populateCartItems,
        },
    });
});

exports.updateCartItemQty = catchAsync(async function (req, res, next) {
    const data = handleZodError(req, next, cartSchema);
    if (!data) return;

    const { userId, productId, quantity } = data;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return next(new AppError(404, "Cart not found"));
    }

    const findCurrentProductIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
        return next(new AppError(404, "Cart item not present"));
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();
    await cart.populate({
        path: "items.productId",
        select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map(item => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        title: item.productId ? item.productId.title : "Product not found",
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity,
    }));

    res.status(200).json({
        status: "success",
        message: "Updated cart items successfully",
        data: {
            ...cart._doc,
            items: populateCartItems,
        },
    });
});

exports.deleteCartItem = catchAsync(async function (req, res, next) {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
        return next(new AppError(400, "Invalid data provided"));
    }

    const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "image title price salePrice",
    });

    if (!cart) {
        return next(new AppError(404, "Cart not Found"));
    }

    cart.items = cart.items.filter(
        item => item.productId.toString !== productId
    );
    await cart.save();

    await cart.populate({
        path: "items.productId",
        select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map(item => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        title: item.productId ? item.productId.title : "Product not found",
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity,
    }));

    res.status(200).json({
        status: "success",
        message: "Cart item deleted successfully",
        data: {
            ...cart._doc,
            items: populateCartItems,
        },
    });
});
