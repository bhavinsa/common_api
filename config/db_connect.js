var mysql = require("mysql");
var config = require("config");
var mysql = require("mysql");

// connect to the db
dbConnectionInfo = {
  port: "3306",
  connectionLimit: 5, //mysql connection pool length
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME
};

//create mysql connection pool
var dbconnection = mysql.createPool(dbConnectionInfo);

// Attempt to catch disconnects
dbconnection.on("connection", function(connection) {
  console.log("DB Connection established");

  connection.on("error", function(err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function(err) {
    console.error(new Date(), "MySQL close", err);
  });
});

module.exports = dbconnection;
