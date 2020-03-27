const winston = require('winston');
// happen in request process pipeline only
module.exports = function(err, req, res, next){
   winston.error(err.message, err);

   
  // error
  // warn
  // info
  // verbose
  // debug 
  // silly

   res.status(500).send(err.toString());
}