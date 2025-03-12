const jwt = require('jsonwebtoken');
require('dotenv').config();

class Authenticate {
    verifyToken(req, res, next) {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(400).json({ error: "Invalid token." });
        }
    }

    requireRole(roles) {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden. You don't have access to this resource." });
            }
            next();
        }
    }
}

module.exports = new Authenticate();