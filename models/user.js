const mongoose = require('mongoose');
//destructuring 
const { Schema } = mongoose;

//define the schema
const userSchema = new Schema({
    firstName: {
        type: String,
        max: 100,
        required: [true, 'First Name Required!!!']
      },
    lastName: {
        type: String,
        max: 100,
        required: [true, 'Last Name Required!!!']
      },
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
const user = mongoose.model('user', userSchema);
//export for use elseware
module.exports = user;