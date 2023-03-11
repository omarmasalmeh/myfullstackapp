//load any enviorment variables form .env file
require('dotenv').config()

const jwtSecretKey = process.env.JWT_SECRET_KEY;


module.exports = {jwtSecretKey};