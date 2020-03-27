const config = require('config');

module.exports = function() {
if (! config.get('jwtPrivateKey') ) {
  // throw new Error("Fatal Error: JWT Private key isn't defined");
}
}