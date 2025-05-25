const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: [true, "Feature image URL is required"],
            trim: true,
            match: [
                /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)$/,
                "Please provide a valid image URL",
            ],
        },
        title: {
            type: String,
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [300, "Description cannot exceed 300 characters"],
        },
    },
    { timestamps: true }
);

const Feature = mongoose.model("Feature", FeatureSchema);
module.exports = Feature;
