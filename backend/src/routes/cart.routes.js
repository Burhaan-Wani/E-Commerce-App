const express = require("express");
const {
    addToCart,
    fetchCartItems,
    updateCartItemQty,
    deleteCartItem,
} = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const accessTo = require("../middlewares/checkRole.middleware");

const router = express.Router();

router.use(authMiddleware);
router.use(accessTo("user"));
router.post("/", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
