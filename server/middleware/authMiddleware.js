const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const authHeader = req.header("Authorization");

    if (!authHeader) {

        return res.status(401).json({
            message: "Access denied. No token provided."
        });

    }

    try {

        // Authorization: Bearer <token>
        const token = authHeader.replace("Bearer ", "");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            message: "Invalid token."
        });

    }

};