const express = require("express");
const {
    getFilteredProducts,
    getProductDetails,
    getSearchProducts,
} = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);
router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);
router.get("/search/:keyword", getSearchProducts);

module.exports = router;
