//import config file
const config = require('../config');

//import JWT
const jwt = require('jsonwebtoken');

//creating validateToken function
const validateToken = (req, res, next) => {
    //initial a variable for the request token
    const headerToken = req.header('x-auth-token')
    //if statement to check if the token exists 
    if (!headerToken) {
        //if not a 401 will be returned with a message
        return res.status(401).send('Not Allowed!')
    }
    try {
        // try to varify the token 
        jwt.verify(headerToken, config.jwtSecretKey) 
        // hit the next point
        next()
        //catch any error
    } catch (error) {
        //if error catched retuen 401 with a message
        res.status(401).send('Invalid Token!')
    }
    
}


module.exports = validateToken