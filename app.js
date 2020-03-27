var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




// to log error in log file
require('./startUp/logging')();



//check jwt privateKey
require('./startUp/config')();

 
//init app
var app = express();
// config routing
require('./startUp/routes')(app);

require('./startUp/prod')(app);
// //conn db
var db = require('./models/index');
 
db.sequelize.authenticate().then(()=> {
  console.log("connecting to db .....");
  
});

 // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

 
  

module.exports = app;
