_ = require("lodash");
var utils = require(basePath + "helper/utils");

var options = {
  /******** COMPLAIN CRUD  ***************/
  addComplain: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.machine_name)) {
      var insertData = {
        machine_name: data.machine_name,
        issue_id: data.issue_id,
        company_id: data.company_id
      };

      dbconnection.query("INSERT INTO complain SET ?", insertData, function(
        err,
        result
      ) {
        let status;
        if (err) {
          logger.info("add addComplain error  " + JSON.stringify(err));
          status = false;
        } else {
          status = true;
          logger.info("add addComplain result  " + JSON.stringify(result));
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
        data: "Please provide valid machine name."
      });
    }
  },
  editComplain: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.id)) {
      var insertData = {
        machine_name: data.machine_name,
        issue_id: data.issue_id,
        company_id: data.company_id
      };

      dbconnection.query(
        "UPDATE complain SET ? WHERE id = " + data.id,
        insertData,
        function(err, result) {
          let status;
          if (err) {
            logger.info("edit editComplain error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info("edit editComplain result  " + JSON.stringify(result));
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
        data: "Please provide valid complain id."
      });
    }
  },
  removeComplain: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.id)) {
      dbconnection.query("DELETE FROM complain WHERE id = " + data.id, function(
        err,
        result
      ) {
        let status;
        if (err) {
          logger.info("removeComplain error  " + JSON.stringify(err));
          status = false;
        } else {
          status = true;
          logger.info("removeComplain  result  " + JSON.stringify(result));
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
        data: "Please provide valid complain id."
      });
    }
  },
  getComplain: function(req, res) {
    var data = req.body;
    dbconnection.query("SELECT * FROM complain", function(err, result) {
      let status;
      if (err) {
        logger.info("getComplain error  " + JSON.stringify(err));
        status = false;
      } else {
        status = true;
        logger.info("getComplain result  " + JSON.stringify(result));
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
