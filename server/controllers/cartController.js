const Cart = require("../models/Cart");

// Add product to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId } = req.body;

        const existingItem = await Cart.findOne({
            user: req.user.id,
            product: productId
        });

        if (existingItem) {
            existingItem.quantity += 1;
            await existingItem.save();

            return res.json(existingItem);
        }

        const cartItem = await Cart.create({
            user: req.user.id,
            product: productId,
            quantity: 1
        });

        res.status(201).json(cartItem);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get logged in user's cart
exports.getCart = async (req, res) => {
    try {

        const cart = await Cart.find({
            user: req.user.id
        }).populate("product");

        res.json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};