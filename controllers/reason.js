_ = require("lodash");
var utils = require(basePath + "helper/utils");

var reasons = {
  /******** reasons CRUD  ***************/
  addReasons: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.reason)) {
      var insertData = {
        reason: data.reason,
        type: data.type,
        option_id: data.option_id,
        field_id: data.field_id
      };

      dbconnection.query("INSERT INTO reasons SET ?", insertData, function(
        err,
        result
      ) {
        let status;
        if (err) {
          logger.info("add addReasons error  " + JSON.stringify(err));
          status = false;
        } else {
          status = true;
          logger.info("add addReasons result  " + JSON.stringify(result));
        }
        utils.sendResponse(res, {
          status: status,
          data: result,
          err: err
        });
      });
    } else {
      utils.sendResponse(res, {
        status: false,
        data: "Please provide reason."
      });
    }
  },
  editReasons: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.id)) {
      var insertData = {
        reason: data.reason,
        type: data.type,
        option_id: data.option_id,
        field_id: data.field_id
      };

      dbconnection.query(
        "UPDATE reasons SET ? WHERE id = " + data.id,
        insertData,
        function(err, result) {
          let status;
          if (err) {
            logger.info("editReasons error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info("editReasons result  " + JSON.stringify(result));
          }
          utils.sendResponse(res, {
            status: status,
            data: result,
            err: err
          });
        }
      );
    } else {
      utils.sendResponse(res, {
        status: false,
        data: "Please provide valid id."
      });
    }
  },
  removeReasons: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.id)) {
      dbconnection.query("DELETE FROM reasons WHERE id = " + data.id, function(
        err,
        result
      ) {
        let status;
        if (err) {
          logger.info("removeReasons error  " + JSON.stringify(err));
          status = false;
        } else {
          status = true;
          logger.info("removeReasons  result  " + JSON.stringify(result));
        }
        utils.sendResponse(res, {
          status: status,
          data: result,
          err: err
        });
      });
    } else {
      utils.sendResponse(res, {
        status: false,
        data: "Please provide valid fields_id"
      });
    }
  },
  getReasons: function(req, res) {
    var data = req.body;
    dbconnection.query("SELECT * FROM reasons", function(err, result) {
      let status;
      if (err) {
        logger.info("getReasons error  " + JSON.stringify(err));
        status = false;
      } else {
        status = true;
        logger.info("getReasons result  " + JSON.stringify(result));
      }
      utils.sendResponse(res, {
        status: status,
        data: result,
        err: err
      });
    });
  }
  /******** Reasons CRUD  ***************/
};

module.exports = reasons;
