// var User = require(basePath + 'models/user');
_ = require('lodash');
// var utils = require(basePath + 'helper/utils');

var user = {
    getUsers: function (req, res) {
        var where = {};
        var data = {
            "status": "success"
        }
        utils.sendResponse(res, {
            data: data
        });
    }
};

module.exports = user;