var winston = require('winston');

//to wrap routing with error function for didn't repeate try and catch block
require('express-async-errors');

module.exports = function(){
    // outside express
//new way
    // const logger = winston.createLogger({
    //     transports: [
    //       new winston.transports.File({ filename: 'path/to/combined.log' })
    //     ],
    //     exceptionHandlers: [
    //         new winston.transports.Console({colorize: true, prettyPrint: true}),
    // new winston.transports.File({filename:'uncaughtException.log'})
    //     ]
    //   });

winston.handleExceptions(
    new winston.transports.Console({colorize: true, prettyPrint: true}),
    new winston.transports.File({filename:'uncaughtException.log'}) 
    );

process.on('unhandledRejection',(ex)=> {
throw ex;  
});
process.on('uncaughtException',(ex)=> {
    throw ex;  
    });

    process.on('SequelizeForeignKeyConstraintError',(ex)=> {
        throw ex;  
        });
winston.add(winston.transports.File,{filename:'logFile.log'})

}