var express = require('express');
var router = express.Router();
var _ = require('lodash');
const itemDao = require('../Dao/itrms.dao')
const auth = require('./../MiddleWare/auth')
const admin = require('./../MiddleWare/admin')


router.post('/add', [auth , admin] ,function(req, res, next) {
    let product = {
      name: req.body.name,
      price:req.body.price,
      restaurantName: req.body.restaurantName,
      description: req.body.description
    }
     
     
    itemDao.add(product).then(product =>{
      return res.status(200).send({msg:'Done created'})
    }).catch(err => {            
      return res.status(400).send({"message": err.toString()});

    })
  
  });

router.delete('/delete/:id', [auth , admin], function(req, res, next) {
  
  itemDao.DeleteOne(req.params.id).then(item => {

      return res.status(200).send('Done delete');

    }).catch(err => {
        return res.status(400).send(err);
    })
});

router.post('/getAll', [auth , admin] ,  function(req, res, next) {
  console.log(req.body);
  
 itemDao.getAll(req.body.restaurantName).then(restaurants => {         
       return res.status(200).send(restaurants);
   }).catch(err => {
       return res.status(400).send(err);
   })
});
module.exports = router;
