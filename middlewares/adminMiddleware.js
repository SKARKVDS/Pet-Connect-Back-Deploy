const jwt = require('jsonwebtoken');
const jwt_key = process.env.JWT_SECRET_KEY;

function checkRole(requiredRole) {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ message: 'Authorization header is missing' });

        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token is missing in the Authorization header' });

        try {
            const decoded = jwt.verify(token, jwt_key);
            if (decoded.role !== requiredRole) {
                return res.status(403).json({ message: 'Insufficient privileges' });
            }
            req.user = decoded;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired', error });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token', error });
            }
            return res.status(403).json({ message: 'You are not allowed to perform this action', error });
        }
    };
}

module.exports = checkRole;
