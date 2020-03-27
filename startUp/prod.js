var compression = require('compression');
var helmet = require('helmet');

module.exports = function(app){
    app.use(compression());
    app.use(helmet());

}