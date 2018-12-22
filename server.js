process.env.TMPDIR = ".";
var http = require("http");

// global Path
global.logger = require("./config/logger");
global.basePath = __dirname + "/";
global.utils = require(basePath + "helper/utils");
global.jwt = require(basePath + "helper/jwt");

require("dotenv").config();

//app configration
var app = require(basePath + "config/app");

//database connection
global.dbconnection = require(basePath + "/config/db_connect.js");

// dbconnection.query("SELECT * FROM user", function(error, results, fields) {
//   console.log("results" + JSON.stringify(results));
//   console.log("fielsa" + JSON.stringify(results));
//   //Do your stuff
// });

//URL
global.baseURL = "http://localhost:" + process.env.PORT + "/";
//server setup
http.createServer(app).listen(process.env.PORT, function() {
  logger.info("Express server listening on port " + process.env.PORT);
});
