const express = require("express");
const {
    addAddress,
    fetchAllAddress,
    deleteAddress,
    updateAddress,
} = require("../controllers/address.controller");
const accessTo = require("../middlewares/checkRole.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);
router.post("/add", addAddress);
router.get("/get/:userId", fetchAllAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.patch("/update/:userId/:addressId", updateAddress);
module.exports = router;
