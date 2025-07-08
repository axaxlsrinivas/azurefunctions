const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validateUser } = require('../shared/auth');

module.exports = async function (context, req) {
    const { email, password } = req.body;

    if (!email || !password) {
        context.res = {
            status: 400,
            body: "Please provide both email and password."
        };
        return;
    }

    const user = await validateUser(email, password);

    if (!user) {
        context.res = {
            status: 401,
            body: "Invalid email or password."
        };
        return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    context.res = {
        status: 200,
        body: { token }
    };
};