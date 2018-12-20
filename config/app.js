var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require("express-validator");
var path = require('path');
var fs = require('fs');

//some environment variables
var app = express();
app.set('port', 3500);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(express.static(path.join(basePath, 'public')));

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
// console.log('basePath --->' + basePath);
app.use('/api', require(basePath + 'routes/api'));
module.exports = app;