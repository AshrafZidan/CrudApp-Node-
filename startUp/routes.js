var usersRouter = require('./../routes/users');
var ordersRouter = require('./../routes/orders');
var restaurantsRouter = require('./../routes/restaurants');
var productRouter = require('./../routes/items');



var express = require('express');
var error = require('./../MiddleWare/error');
module.exports = function(app){
     app.use(express.json());
 

    app.use('/api/users', usersRouter); 
    app.use('/api/orders', ordersRouter);
    app.use('/api/restaurant', restaurantsRouter);
    app.use('/api/product', productRouter);



    app.use(error);
  
}