var express = require('express')
var router = express.Router()

//define sub routers
var usersRouter = require('./users')
router.use('/users', usersRouter)

var usersRouter = require('./products')
router.use('/products', usersRouter)

router.get('/', (req, res) => {
    res.send('Welcome to our API!!! :)')
})


module.exports = router;