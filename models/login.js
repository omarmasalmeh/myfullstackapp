const mongoose = require('mongoose');
//destructuring 
const { Schema } = mongoose;

//define the schema
const loginSchema = new Schema({
    email: {
        type: String,
        match: [/.+\@.+\..+/, 'Incorrect Email Format!!!'],
        unique: true,
        required: [true, 'Email Required!!!']
      },
    password: {
        type: String,
        max: 225,
        required: [true, 'Password Required!!!']
      }
    }, { collection : 'user' });
   

//generating the model from the schema 
const user = mongoose.model('login', loginSchema);
//export for use elseware
module.exports = user;