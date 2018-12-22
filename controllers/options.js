_ = require("lodash");
var utils = require(basePath + "helper/utils");

var options = {
  /******** OPTIONS CRUD  ***************/
  addOptions: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.options_name) && utils.isDefined(data.option_id)) {
      var insertData = {
        options_name: data.options_name,
        option_id: data.option_id
      };

      dbconnection.query(
        "INSERT INTO machine_options SET ?",
        insertData,
        function(err, result) {
          let status;
          if (err) {
            logger.info("add addOptions error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info("add addOptions result  " + JSON.stringify(result));
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
        data: "Please provide option name, id."
      });
    }
  },
  editOptions: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.option_tbl_id)) {
      var insertData = {
        options_name: data.options_name,
        option_id: data.option_id
      };

      dbconnection.query(
        "UPDATE machine_options SET ? WHERE id = " + data.option_tbl_id,
        insertData,
        function(err, result) {
          let status;
          if (err) {
            logger.info("edit editOptions error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info("edit editOptions result  " + JSON.stringify(result));
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
        data: "Please provide valid option_tbl_id id."
      });
    }
  },
  removeOptions: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.option_tbl_id)) {
      dbconnection.query(
        "DELETE FROM machine_options WHERE id = " + data.option_tbl_id,
        function(err, result) {
          let status;
          if (err) {
            logger.info("removeOptions error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info("removeOptions  result  " + JSON.stringify(result));
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
        data: "Please provide valid option_tbl_id"
      });
    }
  },
  getOptions: function(req, res) {
    var data = req.body;
    dbconnection.query("SELECT * FROM machine_options", function(err, result) {
      let status;
      if (err) {
        logger.info("getOptions error  " + JSON.stringify(err));
        status = false;
      } else {
        status = true;
        logger.info("getOptions result  " + JSON.stringify(result));
      }
      utils.sendResponse(res, {
        status: status,
        data: result,
        err: err
      });
    });
  }
  /******** OPTIONS CRUD  ***************/
};

module.exports = options;
