const express = require("express");
const {
    addProductReview,
    getProductReviews,
} = require("../controllers/review.controller");

const router = express.Router();

router.post("/add", addProductReview);
router.post("/:productId", getProductReviews);

module.exports = router;
