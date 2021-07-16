const validateInfo = (req, res, next) => {
    const { name, email, password } = req.body

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
    }

    if(req.path === '/login') {
        if(email === '' || password === '') {
            return res.status(401).send('Missing credentials!')
        }
    
        if(!validateEmail(email)) {
            return res.status(401).send('Invalid email format!')
        }
    }

    if(req.path === '/register') {
        if(name === '' || password === '') {
            return res.status(401).send('Missing credentials!')
        }
    
        if(!validateEmail(email)) {
            return res.status(401).send('Invalid email format!')
        }
    }

    next()
}

module.exports = validateInfo