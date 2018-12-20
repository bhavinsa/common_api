process.env.TMPDIR = '.';
var http = require('http');

// global Path
global.logger = require('./config/logger');
global.basePath = __dirname + '/';
global.utils = require(basePath + 'helper/utils');
require('dotenv').config();

//app configration
var app = require(basePath + 'config/app');

//database connection
require(basePath + '/config/db_connect.js');

//URL
global.baseURL = "http://localhost:" + process.env.PORT + "/";

//server setup
http.createServer(app).listen(process.env.PORT, function () {
    logger.info('Express server listening on port ' + process.env.PORT);
});