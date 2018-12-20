var winston = require('winston');
require('winston-daily-rotate-file');
/**
 * Example model.
 *
 * @module loggerjs
 */

//require('winston-redis').Redis;
var currentDate = new Date();
var FileName = currentDate.toDateString();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.DailyRotateFile({
            filename: __dirname + '/ErrorLogs/Errorlogs.log',
            json: true,
            rotationFormat: "yyyy-mm-dd"
        }),
        new winston.transports.File({
            filename: __dirname + '/ErrorLogs/Errorlogs.log',
        })
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}


module.exports = logger;