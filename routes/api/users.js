var express = require('express');
var router = express.Router();

//import the User model
const user = require('../../models/user')
const Login = require('../../models/login')
//import bcrypt
const bcrypt = require('bcrypt');

//import config file
const config = require('../../config');

//import JWT
const jwt = require('jsonwebtoken');




/* Register new user. */
router.post('/register', async (req, res) => {
  
  var em =  {email : req.body.email}
 
 
  //get the email body from the request
  const fEmail = await user.find().where("email").equals(Object.values(em))
     
     if (fEmail.length == 1){
      
      return res.status(400).send('User already existed')

    } else {
    
    
     //hash the givin password bt the user
     var pass = req.body.password
      bcrypt.hash(pass, 10, (err, hash) => {
        if (err) {
          return res.status(500).send("An error has occurred") 
        } 
        // override the existed password with the hashed one
        req.body.password = hash;

        const newUsr = new user({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        })

        const payload = {
          email: req.body.email
      }

        newUsr.save()
        .then(usr => {
          jwt.sign(payload, config.jwtSecretKey, {}, (err, token) => {

            if (err) {
              return res.status(500).send();
            }
            if (token) {
             res.header('x-auth-token', token);
             res.header('Access-Control-Expose-Headers', 'x-auth-token')
             res.status(201).send('The new user was successfully created')
            
            }})

          
          
        }) 
        .catch(err => {
          res.status(422).send(err.message)
        })
        
    
     
    })

  }

  
  
})
  
  


router.post('/login', (req, res) => {

  const login = new Login(req.body)




   login.validate(req.body, (error) => {

    if(error){
      return res.status(422).send(error);
    }

    user.findOne({email: req.body.email}, (err, userInfo) => {

      if(!userInfo) return res.status(401).send({serverMessage: 'Bad Credentials'})

      bcrypt.compare(req.body.password, userInfo.password, (err, result) => {

        if(!result) return res.status(401).send({serverMessage: 'Bad Credentials'})
        
        jwt.sign({email: userInfo.email}, config.jwtSecretKey, {}, (err, token) => {
  
          if (err) {
            return res.status(500).send();
          }
          if (token) {
           res.header('x-auth-token', token);
           res.header('Access-Control-Expose-Headers', 'x-auth-token')
       
            return res.status(200).send('Successfully Login');
          }

        });

      })

    })

    
  
    
  })

  
  
  
  
});

module.exports = router;
