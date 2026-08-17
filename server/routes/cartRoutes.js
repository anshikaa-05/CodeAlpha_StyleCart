const express = require("express");
const router = express.Router();

const {
    addToCart,
    getCart
} = require("../controllers/cartController");

const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");

// Add product to cart
router.post("/", authMiddleware, addToCart);

// Get logged-in user's cart
router.get("/", authMiddleware, getCart);

// Remove product from cart
router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const cartItem = await Cart.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!cartItem) {

            return res.status(404).json({
                message: "Cart item not found"
            });

        }

        res.json({
            message: "Item removed from cart"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to remove item"
        });

    }

});

module.exports = router;