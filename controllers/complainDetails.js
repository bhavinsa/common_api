_ = require("lodash");
var utils = require(basePath + "helper/utils");

var options = {
  /******** COMPLAIN CRUD  ***************/
  addComplainDetails: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.reason_value)) {
      var insertData = {
        complain_id: data.complain_id,
        reason_id: data.reason_id,
        reason_value: data.reason_value
      };

      dbconnection.query(
        "INSERT INTO complain_details SET ?",
        insertData,
        function(err, result) {
          let status;
          if (err) {
            logger.info("add addComplainDetails error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info(
              "add addComplainDetails result  " + JSON.stringify(result)
            );
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
        data: "Please provide valid reason name."
      });
    }
  },
  editComplainDetails: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.id)) {
      var insertData = {
        complain_id: data.complain_id,
        reason_id: data.reason_id,
        reason_value: data.reason_value
      };

      dbconnection.query(
        "UPDATE complain_details SET ? WHERE id = " + data.id,
        insertData,
        function(err, result) {
          let status;
          if (err) {
            logger.info(
              "edit editComplainDetails error  " + JSON.stringify(err)
            );
            status = false;
          } else {
            status = true;
            logger.info(
              "edit editComplainDetails result  " + JSON.stringify(result)
            );
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
        data: "Please provide valid complain details id."
      });
    }
  },
  removeComplainDetails: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.id)) {
      dbconnection.query(
        "DELETE FROM complain_details WHERE id = " + data.id,
        function(err, result) {
          let status;
          if (err) {
            logger.info("removeComplainDetails error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info(
              "removeComplainDetails  result  " + JSON.stringify(result)
            );
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
        data: "Please provide valid complain details id."
      });
    }
  },
  getComplainDetails: function(req, res) {
    var data = req.body;
    dbconnection.query("SELECT * FROM complain_details", function(err, result) {
      let status;
      if (err) {
        logger.info("getComplainDetails error  " + JSON.stringify(err));
        status = false;
      } else {
        status = true;
        logger.info("getComplainDetails result  " + JSON.stringify(result));
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
