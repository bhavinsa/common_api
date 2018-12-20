var express = require('express');
var router = express.Router();
var user = require(basePath + 'controllers/user');
// var product = require(basePath + 'controllers/product');
// var auth = require(basePath + 'helper/auth');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

//router.param('id', user.user);
// router.route('/authenticate').post(user.authenticate);
// router.route('/user').post(multipartMiddleware ,user.create);
router.route('/user/getUsers').get(user.getUsers);
// router.route('/user/delete').post(user.delete);
// router.route('/user/update').post(multipartMiddleware, user.update);

//router.post('/product', multipartMiddleware, product.create); //Create new user
module.exports = router;