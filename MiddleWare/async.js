//resolve repeat try catch block
module.exports = function (handler) {
    return async (req, res, next) => {
      try {
        await handler(req, res);
      }
      catch(ex) {        
        next(ex);
      }
    };  
  }