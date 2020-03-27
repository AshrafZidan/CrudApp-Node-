var express = require('express');
var router = express.Router();
var _ = require('lodash');
const Restaurant = require('../Dao/restaurant.dao')
const auth = require('./../MiddleWare/auth')
const admin = require('./../MiddleWare/admin')



router.post('/add', [auth , admin] ,function(req, res, next) {
    let restaurant = {
      phone: req.body.phone,
      name: req.body.name,
      location:req.body.location,
      delivery_cost: req.body.delivery_cost
    }
    Restaurant.createNewRestaurant(restaurant).then(restaurant =>{
      return res.status(200).send({msg:'Done created'})
    }).catch(err => {
      return res.status(400).send(err)

    })
  
  });

router.delete('/delete/:id', [auth , admin], function(req, res, next) {
  
  Restaurant.DeleteOne(req.params.id).then(restaurant => {

      return res.status(200).send('Done delete');

    }).catch(err => {
        return res.status(400).send(err);
    })
});

router.get('/getAll', [auth , admin] ,  function(req, res, next) {

  
 Restaurant.getAll().then(restaurants => {         
       return res.status(200).send(restaurants);
   }).catch(err => {
       return res.status(400).send(err);
   })
});

router.get('/changeDefault/:id', [auth , admin] ,  function(req, res, next) {

  
  Restaurant.changeDefault(req.params.id).then(restaurants => { 
             
          res.status(200).send(restaurants);
    }).catch(err => {
          res.status(400).send(err);
    })
 });

module.exports = router;
