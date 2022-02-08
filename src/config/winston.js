var appRoot = require('app-root-path');
var winston = require('winston');
var { getLocalTime } = require('@utils/generator');


// define the custom settings for each transport (file, console)
var options = {
    error: {
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: process.env.LOG_SIZE,
        colorize: false,
    },
};

// instantiate a new Winston Logger with the settings defined above
var logger = new winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: getLocalTime() }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File(options.error),
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};

module.exports = logger;