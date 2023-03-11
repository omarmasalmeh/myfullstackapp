const mongoose = require('mongoose');
//destructuring 
const { Schema } = mongoose;

//define the schema
const productSchema = new Schema({
    product_name: {
        type: String,
        required: [true, 'Product Name Required!!!']
      },
    price: {
        type: String,
        required: [true, 'Product Price Required!!!']
      },
    pictures: {
      type: String,
      required: [true, 'Product Picture Required!!!']
    },
    description: {
      type: String,
      required: [true, 'Product description Required!!!']
    },
    rating: {
        rank: 'Number',
        score: 'Number'
    }}, { collection : 'product' });

//generating the model from the schema 
const product = mongoose.model('Product', productSchema);
//export for use elseware
module.exports = product;