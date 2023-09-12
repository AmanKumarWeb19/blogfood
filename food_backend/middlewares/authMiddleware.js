const jwt = require('jsonwebtoken');
const colors = require('colors');

const authentication = (req, res, next) => {
    try {
        // Check for the presence of a JWT token in the request headers
        const token = req.header('Authorization');
        // const token  = req.headers.Authorization;

        if (!token) {
            // If no token is found, return a 401 Unauthorized status code
            return res.status(401).json({ error: 'You are Unauthorized to access this route' });
        }

        // Verify the JWT token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                // If the token is invalid or expired, return a 401 Unauthorized status code
                return res.status(401).json({ error: 'Unauthorized' });
            }

            // If the token is valid, you can access the user's ID using decoded.userId
            // You can also attach user information to the request for later use if needed
            req.userId = decoded.userId;

            // Continue to the next middleware or route
            next();
        });
    } catch (error) {
        console.error(colors.red(`Error in authentication middleware: ${error.message}`));
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { authentication };
