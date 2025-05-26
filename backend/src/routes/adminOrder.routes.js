const express = require("express");
const {
    getAllOrdersOfAllUsers,
    getOrderDetailsForAdmin,
    updateOrderStatus,
} = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const accessTo = require("../middlewares/checkRole.middleware");

const router = express.Router();

router.use(authMiddleware);
router.use(accessTo("admin"));

router.get("/", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);

module.exports = router;
