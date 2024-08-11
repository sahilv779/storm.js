const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Secret key for JWT
const SECRET_KEY = 'your-secret-key'; // Change this to a more secure secret key

// Function to generate a JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
};

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }

        req.userId = decoded.id;
        next();
    });
};

module.exports = {
    generateToken,
    verifyToken,
};
