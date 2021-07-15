const jwt = require('jsonwebtoken')
require('dotenv').config()

const oneHour = 60 * 60

const jwtGenerator = (user_id) => {
    const payload = {
        user: user_id
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: oneHour})
}

module.exports = jwtGenerator
