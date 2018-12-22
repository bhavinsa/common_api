_ = require("lodash");
var utils = require(basePath + "helper/utils");

var options = {
  /******** OPTIONS CRUD  ***************/
  addIssues: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.issue_name)) {
      var insertData = {
        issue_name: data.issue_name,
        multiple_field_ids: data.multiple_field_ids
      };

      dbconnection.query("INSERT INTO issues SET ?", insertData, function(
        err,
        result
      ) {
        let status;
        if (err) {
          logger.info("add addIssues error  " + JSON.stringify(err));
          status = false;
        } else {
          status = true;
          logger.info("add addIssues result  " + JSON.stringify(result));
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
        data: "Please provide valid issue name."
      });
    }
  },
  editIssues: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.id)) {
      var insertData = {
        issue_name: data.issue_name,
        multiple_field_ids: data.multiple_field_ids
      };

      dbconnection.query(
        "UPDATE issues SET ? WHERE id = " + data.id,
        insertData,
        function(err, result) {
          let status;
          if (err) {
            logger.info("edit editIssues error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info("edit editIssues result  " + JSON.stringify(result));
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
        data: "Please provide valid issue id."
      });
    }
  },
  removeIssues: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.id)) {
      dbconnection.query("DELETE FROM issues WHERE id = " + data.id, function(
        err,
        result
      ) {
        let status;
        if (err) {
          logger.info("removeIssues error  " + JSON.stringify(err));
          status = false;
        } else {
          status = true;
          logger.info("removeIssues  result  " + JSON.stringify(result));
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
        data: "Please provide valid issue id."
      });
    }
  },
  getIssues: function(req, res) {
    var data = req.body;
    dbconnection.query("SELECT * FROM issues", function(err, result) {
      let status;
      if (err) {
        logger.info("getIssues error  " + JSON.stringify(err));
        status = false;
      } else {
        status = true;
        logger.info("getIssues result  " + JSON.stringify(result));
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
