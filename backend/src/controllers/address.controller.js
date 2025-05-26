const Address = require("../models/address.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { addressSchema } = require("../utils/zod/address.schema");
const handleZodError = require("../utils/zod/zodError");

exports.addAddress = catchAsync(async function (req, res, next) {
    const data = handleZodError(req, next, addressSchema);
    if (!data) return;

    const newAddress = await Address.create(data);
    res.status(201).json({
        status: "success",
        message: "Address created successfully",
        data: {
            address: newAddress,
        },
    });
});

exports.fetchAllAddress = catchAsync(async function (req, res, next) {
    const { userId } = req.params;
    if (!userId) {
        return next(new AppError(404, "User id is required"));
    }
    const addresses = await Address.find({ userId });
    res.status(200).json({
        status: "success",
        message: "Addresses fetched successfully",
        data: {
            addresses,
        },
    });
});

exports.deleteAddress = catchAsync(async function (req, res, next) {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
        return next(new AppError(400, "UserId and AddressId is required"));
    }
    const address = await Address.findOneAndDelete({ _id: addressId, userId });
    if (!address) {
        return next(new AppError(404, "Address not found"));
    }
    res.status(200).json({
        status: "success",
        message: "Address deleted successfully",
    });
});

exports.updateAddress = catchAsync(async function (req, res, next) {
    const { userId, addressId } = req.params;
    const body = req.body;

    if (!userId || !addressId) {
        return next(new AppError(400, "UserId and AddressId is required"));
    }
    const address = await Address.findOneAndUpdate(
        { _id: addressId, userId },
        body,
        {
            new: true,
        }
    );
    if (!address) {
        return next(new AppError(404, "Address not found"));
    }
    res.status(200).json({
        status: "success",
        message: "Address updated successfully",
        data: {
            address,
        },
    });
});
