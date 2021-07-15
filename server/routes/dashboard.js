const router = require('express').Router()
const db = require('../db')
const authorization = require('../middleware/authorization')

router.get('/', authorization, async (req, res) => {
    try {
        
        const user = req.user

        const userName = await db.query('SELECT user_name FROM users WHERE user_id = $1', [user])

        res.json(userName.rows[0].user_name)
        
        
    } catch (err) {
        console.log(err.message)
        res.status(500).json('Server Error')
    }
})

module.exports = router