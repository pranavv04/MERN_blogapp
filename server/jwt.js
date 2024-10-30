 const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: "Token not found" });

    // Extract the JWT token from the request headers
    const token = authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Invalid token' });
    }
};

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjusted to 1 hour
};

module.exports = { jwtAuthMiddleware, generateToken };
