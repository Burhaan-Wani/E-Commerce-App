const express = require("express");
const {
    addFeatureImage,
    getFeatureImages,
} = require("../controllers/feature.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const accessTo = require("../middlewares/checkRole.middleware");

const router = express.Router();

router.post("/add", authMiddleware, accessTo("admin"), addFeatureImage);
router.get("/get", getFeatureImages);

module.exports = router;
