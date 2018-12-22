_ = require("lodash");
var utils = require(basePath + "helper/utils");

var machineDetails = {
  /******** MachineFields CRUD  ***************/
  addMachineDetails: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.machine_name)) {
      var insertData = {
        machine_name: data.machine_name
      };
      for (k = 1; k <= 86; k++) {
        if (utils.isDefined(data["m" + k])) {
          insertData["m" + k] = data["m" + k];
        }
      }

      dbconnection.query(
        "INSERT INTO machine_details SET ?",
        insertData,
        function(err, result) {
          let status;
          if (err) {
            logger.info("add addMachineDetails error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info(
              "add addMachineDetails result  " + JSON.stringify(result)
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
        data: "Please provide machine_name."
      });
    }
  },
  editMachineDetails: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.machine_id)) {
      var insertData = {
        machine_name: data.machine_name
      };
      for (k = 1; k <= 86; k++) {
        if (utils.isDefined(data["m" + k])) {
          insertData["m" + k] = data["m" + k];
        }
      }

      dbconnection.query(
        "UPDATE machine_details SET ? WHERE machine_id = " + data.machine_id,
        insertData,
        function(err, result) {
          let status;
          if (err) {
            logger.info("editMachineDetails error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info("editMachineDetails result  " + JSON.stringify(result));
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
        data: "Please provide valid machine_id."
      });
    }
  },
  removeMachineDetails: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.machine_id)) {
      dbconnection.query(
        "DELETE FROM machine_details WHERE machine_id = " + data.machine_id,
        function(err, result) {
          let status;
          if (err) {
            logger.info("removeMachineDetails error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info(
              "removeMachineDetails  result  " + JSON.stringify(result)
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
        data: "Please provide valid machine_id"
      });
    }
  },
  getMachineDetails: function(req, res) {
    var data = req.body;
    dbconnection.query("SELECT * FROM machine_details", function(err, result) {
      let status;
      if (err) {
        logger.info("getMachineDetails error  " + JSON.stringify(err));
        status = false;
      } else {
        status = true;
        logger.info("getMachineDetails result  " + JSON.stringify(result));
      }
      utils.sendResponse(res, {
        status: status,
        data: result,
        err: err
      });
    });
  }
  /******** MachineFields CRUD  ***************/
};

module.exports = machineDetails;
