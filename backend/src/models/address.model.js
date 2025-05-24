const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true,
            maxlength: [200, "Address cannot exceed 200 characters"],
        },
        city: {
            type: String,
            required: [true, "City is required"],
            trim: true,
            maxlength: [50, "City cannot exceed 50 characters"],
        },
        state: {
            type: String,
            trim: true,
            maxlength: [50, "State cannot exceed 50 characters"],
        },
        country: {
            type: String,
            trim: true,
            default: "India", // change if needed
        },
        pincode: {
            type: String,
            required: [true, "Pincode is required"],
            match: [/^\d{5,6}$/, "Pincode must be 5 or 6 digits"],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            match: [/^\d{10}$/, "Phone number must be 10 digits"],
        },
        notes: {
            type: String,
            trim: true,
            maxlength: [200, "Notes cannot exceed 200 characters"],
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
