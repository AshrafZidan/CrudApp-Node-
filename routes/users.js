var express = require('express');
var router = express.Router();
var _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('../Dao/user.dao')
const config = require('config');
const auth = require('./../MiddleWare/auth')
const admin = require('./../MiddleWare/admin')
/* GET users listing. */
router.get('/', auth ,function(req, res, next) {
   res.send('access');
});



router.post('/approveUser', [auth, admin] ,function(req, res, next) {
    let user = {
      id: req.body.id,
      email: req.body.email,
    }
    User.approveUser(user).then(user =>{
       res.status(200).send({msg:'Done Approved'})
    }).catch(err => {
       res.status(400).send(err.toString())

    })
  
  });

router.post('/registerUser',  function(req, res, next) {
  
   let newUser = {
    name: req.body.name,
    email: req.body.email,
    isAdmin:req.body.isAdmin,
    password: req.body.password
  }
   
  User.createNewUser(newUser).then(user => {

        return res.status(200).send(_.pick(user,['name','email']));
    }).catch(err => {
      
        return res.status(400).send( err);
    })
});

router.post('/login',  function(req, res, next) {
  
  let user = {
   email: req.body.email,
   password: req.body.password
 }
  
  
 User.login(user).then(user => {
   
      var token =   jwt.sign({_id:user.user_id , isAdmin: user.isAdmin}, "asset99a");

      // .header('x-auth-token',token)
      let returnderuser = {
        "token": token,
        "isAdmin":user.isAdmin,
         "name": user.name
      }
       return res.status(200).send(returnderuser);
   }).catch(err => {
       return res.status(400).send(err);
   })
});


router.get('/allApproval', [auth , admin], function(req, res, next) {
  
 User.getAllNeedsApprove().then(users => {      
 
    const pickedUsers =  _.map(users, _.partialRight(_.pick, ['user_id','name','email'] ));
    res.status(200).send(pickedUsers);
   }).catch(err => {
       res.status(400).send(err);
   })
})

module.exports = router;
