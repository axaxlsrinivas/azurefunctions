const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock user database
const users = [
    {
        email: 'user@example.com',
        password: null // Placeholder for hashed password
    }
];

// Function to hash the password and assign it to the user database
function initializeUsers() {
    const plainPassword = 'password123'; // Replace with the desired plain text password
    const saltRounds = 10;

    users.forEach(user => {
        if (!user.password) {
            user.password = bcrypt.hashSync(plainPassword, saltRounds);
        }
    });
}

// Initialize users with hashed passwords
initializeUsers();

/**
 * Validates user credentials.
 * @param {string} email - User's email.
 * @param {string} password - User's plain text password.
 * @returns {boolean} - Returns true if credentials are valid, otherwise false.
 */
function validateUser(email, password) {
    const user = users.find(u => u.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
        return true;
    }
    return false;
}

/**
 * Generates a JWT token for the given email.
 * @param {string} email - User's email.
 * @returns {string} - Signed JWT token.
 */
function generateToken(email) {
    const payload = { email };
    const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable for secret
    const options = { expiresIn: '1h' };

    try {
        return jwt.sign(payload, secret, options);
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
    }
}

module.exports = {
    validateUser,
    generateToken
};