var express = require('express');
var router = express.Router();
var _ = require('lodash');
const jwt = require('jsonwebtoken');
const Order = require('../Dao/order.dao')
const auth = require('./../MiddleWare/auth')
const admin = require('./../MiddleWare/admin')
/* GET users listing. */
router.get('/', auth ,function(req, res, next) {
   res.send('access');
});



router.post('/createOrder', [auth] ,function(req, res, next) {
    let order = {
      user_id: req.body.user_id,
      items: req.body.items,
      comments:req.body.comments
    }
          

    
    Order.createNewOrder(order).
    then(order =>{
      return res.status(200).send('created')
    }).catch(err => {
      return res.status(400).send(err)

    })
  
  });


router.get('/getOrderByUser/:id',  function(req, res, next) {
  
    
  Order.getOrderByUser(req.params.id).then(user => {

        return res.status(200).send(user);
    }).catch(err => {
         
        return res.status(400).send(err.toString());
    })
});

router.post('/login',  function(req, res, next) {
  
  let user = {
   email: req.body.email,
   password: req.body.password
 }
  
 User.login(user).then(user => {
   
      var token =   jwt.sign({_id:user.user_id , isAdmin: user.isAdmin}, "asset99a");
  // console.log("token" , config.get('jwtPrivateKey'));

      // .header('x-auth-token',token)
      
       return res.status(200).send(token);
   }).catch(err => {
       return res.status(400).send(err);
   })
});
module.exports = router;
