const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true });

app.use(express.static( __dirname + '/public/dist/public' ));

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!!!'],
        minlength: [3, "Product name needs to be at least 3 characters!!!"]
    },
    quantity:{
        type: Number,
        required: [true, 'Quantity of your product is required!!!'],
        min: [0, "Quantity of product should to be 0 or more than 0!!!"]
    },
    price:{
        type: Number,
        required: [true, 'Price is required!!!'],
        min: [0.98, "Price is required to be greater than 0.98$ !!!"]
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
 });
 
 const Product = mongoose.model('Product', ProductSchema);


// GET: Retrieve all Products
app.get('/products', function(req, res){
    Product.find({}, function(err, products){
        if(err){
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
           res.json({message: 'All Products:', data: products})
        }
     });
 });
 
 // GET: Retrieve a Product by ID
 app.get('/products/:id', function(req, res){
    Product.findOne({ _id: req.params.id }, function(err, product){
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            // res.json({message: 'Product:', daddy: product})
            res.json({message: 'Product:', data: product})
        }
    });
 });
 
 // POST: Create a Product
 app.post('/products', function(req, res){
    var newProduct = new Product();
    newProduct.id = req.body.id;
    newProduct.name = req.body.name;
    newProduct.quantity = req.body.quantity;
    newProduct.price = req.body.price;

    newProduct.save(function(err, product){
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            res.json({message: 'New Product:', data: product})
        }
    });
 });
 
//  // PUT: Update a Product by ID
//  app.put('/products/:id', function(req, res){
//     Product.findOneAndUpdate({ _id: req.params.id }, { 
//         name: req.body.name, 
//         quantity: req.body.quantity,
//         price: req.body.price,
// 
//     }, function (err, product) {
//         if (err) {
//             console.log('*********************');
//             console.log('Returned Error: ', err);
//             res.json({message: 'Error', error: err})
//         }
//         else {
//             res.json({message: 'Updated Product:', data: product})
//         }
//     });
//  });





 // PUT: Update a Product by ID with validations
 app.put('/products/:id', function(req, res){
    Product.findOne({ _id: req.params.id }, function (err, product) {
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        product.name = req.body.name;
        product.quantity = req.body.quantity;
        product.price = req.body.price;
        product.save(function(err, updatedProduct){
            if (err) {
                console.log('*********************');
                console.log('Returned Error: ', err);
                res.json({message: 'Error', error: err})
            }
            else {
                res.json({message: 'Updated Product:', data: product})
            }
        })
    });
 });






 
 // DELETE: Delete a Product by ID
 app.delete('/products/:id/', function(req, res){
    Product.remove({ _id: req.params.id }, function(err){
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            Product.find({}, function(err, products){
                if(err){
                    console.log('*********************');
                    console.log('Returned Error: ', err);
                    res.json({message: 'Error', error: err})
                }
                else {
                   res.json({message: 'Deletion Successful:', data: products})
                }
            });
        }
    });
 });




 app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
 });


 
 app.listen(8000, function () {
    console.log('listening on port 8000');
 });