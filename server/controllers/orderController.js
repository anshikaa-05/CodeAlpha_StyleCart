const Order = require("../models/Order");
const Cart = require("../models/Cart");

// ==============================
// CREATE ORDER
// ==============================

exports.createOrder = async (req, res) => {
    try {

        const { fullName, phone, address, city, pincode } = req.body;

        // Check shipping details
        if (!fullName || !phone || !address || !city || !pincode) {
            return res.status(400).json({
                message: "Please fill all shipping details"
            });
        }

        // Get user's cart
        const cart = await Cart.find({
            user: req.user.id
        }).populate("product");

        if (cart.length === 0) {
            return res.status(400).json({
                message: "Your cart is empty"
            });
        }

        // Prepare order items
        const items = cart.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }));

        // Calculate total
        const totalAmount = cart.reduce(
            (total, item) =>
                total + item.product.price * item.quantity,
            0
        );

        // Create order
        const order = await Order.create({
            user: req.user.id,
            items,
            totalAmount,
            shippingAddress: {
                fullName,
                phone,
                address,
                city,
                pincode
            }
        });

        // Clear cart after successful order
        await Cart.deleteMany({
            user: req.user.id
        });

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to place order"
        });

    }
};