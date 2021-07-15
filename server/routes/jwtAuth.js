const router = require('express').Router()
const bcrypt = require('bcrypt')
const db = require('../db')
const jwtGenerator = require('../utils/jwtGenerator')
const validateInfo = require('../middleware/validateInfo')
const authorization = require('../middleware/authorization')

// Register route

router.post('/register', validateInfo, async (req, res) => {
    try {

        // 1. Destructore the req.body (name, email, password)

        const { name, email, password } = req.body


        // 2. Check if user exist (if user exist then throw error)

        const user = await db.query('SELECT * FROM users WHERE user_email = $1', [email])
        
        if(user.rows.length !== 0) {
            res.status(409).send('Email already taken.')
        }

        // 3. Bcrypt the password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)

        const bcryptPassword = await bcrypt.hash(password, salt)

        // 4. Enter the new user inside our db

        const newUser = await db.query('INSERT INTO users(user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *', [name, email, bcryptPassword])

        // 5. Generating our jwt token

        const token = jwtGenerator(newUser.rows[0].user_id)

        res.json({token})
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// Login route

router.post('/login', validateInfo, async (req, res) => {
    try {

        // 1. Destructure req.body

        const { email, password } = req.body

        // 2. Check if user doesn't exist (if not then throw an error)

        const user = await db.query('SELECT * FROM users where user_email = $1', [email])

        if(user.rows.length === 0) {
            return res.status(401).send('Incorrect email address or password.')
        }

        // 3. Check if the incoming password is the same as the db password for the user

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if(!validPassword) {
            return res.status(401).send('Incorrect email address or password.')
        }

        // 4. Give them the jwt token

        const token = jwtGenerator(user.rows[0].user_id)

        res.json({token})

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

router.get('/is-verify', authorization, async (req, res) => {
    try {

        res.json(true)
        
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router
