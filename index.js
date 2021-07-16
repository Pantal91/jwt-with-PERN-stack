const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./db')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 3001

// Middleware

app.use(express.json()) // req.body
app.use(cors())
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
}
app.use(express.static(path.join(__dirname, 'client/build')))

// Register and login routes

app.use('/auth', require('./routes/jwtAuth'))

// Dashboard route

app.use('/dashboard', require('./routes/dashboard'))

app.get('*', (req, res) => {
    res.send('<h1>Error 404 - Not Found!</h1>')
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
})