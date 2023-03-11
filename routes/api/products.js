var express = require('express')
var router = express.Router()

//import validateToken file
const validateToken = require('../../middleware/validateToken');

// router.use(validateToken)

//import the Products model
const product = require('../../models/product')

//define endpoints for products resource

//Get All Products
router.get('/', (req, res) => {

    // executes, passing results to callback

    product.find((err, data) => {

        //handle if an error occurred 
        if(err){
            res.status(500).send('An error occurred')
        }

        res.json(data)
    })
})

//Get One product By ID
router.get('/:id', (req, res) => {

    product.findById(req.params.id, (err, data) => {
        if(err){
            return res.status(400).send(`Error: ${ err }`)
        }

        if(!data){
            res.status(404).send('No Data Found')
        }

        res.send(data)
    })
})

//Create product
router.post('/', validateToken, (req, res) => {
    const myProduct = new product(req.body)
    myProduct.validate(req.body, (error) => {

        if(error){
            return res.status(422).send(error);
          }

    const newPro = new product({
        product_name: req.body.product_name,
        price: '$'+ req.body.price,
        pictures: req.body.pictures,
        description: req.body.description,
        rating: req.body.rating
      })

      newPro.save()
      .then(pro => {
        res.status(201).send('The new product was successfully stored')
        
      }) 
      .catch(err => {
        res.status(422).send(err)
      })
    })
    
})

//Update product By ID
router.put('/:id', validateToken, (req, res) => {
    const myProduct = new product(req.body)
    myProduct.validate(req.body, (error) => {

        if(error){
          return res.status(422).send(error);
        }
    
    product.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if(err){
            return res.status(401).send(err)
        }

        if(!data){
            res.status(404).send()
        }

        res.send(data)
    })
})

})

//Delete product By ID\
router.delete('/:id', validateToken, (req, res) => {
    
    product.findByIdAndRemove(req.params.id, (err, data) => {
        if(err){
            return res.status(401).send(err)
        }

        if(!data){
            res.status(404).send()
        }

        res.send(data)
    })

})

module.exports = router