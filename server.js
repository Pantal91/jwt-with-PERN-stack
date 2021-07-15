const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./db')
const cors = require('cors')
const port = process.env.PORT || 3001

// Middleware

app.use(express.json()) // req.body
app.use(cors())

// Routes

// Register and login routes

app.use('/auth', require('./routes/jwtAuth'))

// Dashboard route

app.use('/dashboard', require('./routes/dashboard'))

app.get('/', async (req, res) => {
    try {
        const response = await db.query('select * from users')
        res.json(response.rows)
    } catch(err) {
        console.log(err)
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${port}...`)
})