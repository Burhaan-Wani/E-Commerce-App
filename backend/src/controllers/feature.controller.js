const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Feature = require("../models/feature.model");

exports.addFeatureImage = catchAsync(async function (req, res, next) {
    const { image } = req.body;

    if (!image) {
        return next(new AppError(400, "Image is required"));
    }

    const featureImage = await Feature.create({
        image,
    });

    res.status(201).json({
        status: "success",
        message: "Feature Image added successfully",
        data: {
            featureImage,
        },
    });
});

exports.getFeatureImages = catchAsync(async function (req, res, next) {
    const featureImages = await Feature.find({});
    if (featureImages.length === 0) {
        return next(new AppError(404, "No feature images found"));
    }
    res.status(200).json({
        status: "success",
        message: "feature image fetched successfully",
        data: {
            images: featureImages,
        },
    });
});
