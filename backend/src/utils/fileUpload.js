const { cloudinary } = require("../lib/cloudinary");
const fs = require("fs");
const AppError = require("./appError");

const fileUpload = async function (file) {
    try {
        const response = await cloudinary.uploader.upload(file.path, {
            folder: "E-Commerce",
        });

        // Delete local file after successful upload
        fs.unlinkSync(file.path);

        return response;
    } catch (error) {
        // Optional: delete the file if upload failed
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        // Rethrow or handle the error properly
        throw new AppError(500, "Failed to upload file to Cloudinary");
    }
};

module.exports = fileUpload;
