_ = require("lodash");
var utils = require(basePath + "helper/utils");

var machineDetailsChild = {
  /******** MACHINEDETAILSCHILD CRUD  ***************/
  addMachineDetailsChild: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.value)) {
      var insertData = {
        machine_details_id: data.machine_details_id,
        field_id: data.field_id,
        value: data.value
      };

      dbconnection.query(
        "INSERT INTO machine_details_child SET ?",
        insertData,
        function(err, result) {
          let status;
          if (err) {
            logger.info(
              "add addMachineDetailsChild error  " + JSON.stringify(err)
            );
            status = false;
          } else {
            status = true;
            logger.info(
              "add addMachineDetailsChild result  " + JSON.stringify(result)
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
        data: "Please provide valid machine child value."
      });
    }
  },
  editMachineDetailsChild: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.id)) {
      var insertData = {
        machine_details_id: data.machine_details_id,
        field_id: data.field_id,
        value: data.value
      };

      dbconnection.query(
        "UPDATE machine_details_child SET ? WHERE id = " + data.id,
        insertData,
        function(err, result) {
          let status;
          if (err) {
            logger.info(
              "editMachineDetailsChild error  " + JSON.stringify(err)
            );
            status = false;
          } else {
            status = true;
            logger.info(
              "editMachineDetailsChild result  " + JSON.stringify(result)
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
        data: "Please provide valid machine details child id."
      });
    }
  },
  removeMachineDetailsChild: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.id)) {
      dbconnection.query(
        "DELETE FROM machine_details_child WHERE id = " + data.id,
        function(err, result) {
          let status;
          if (err) {
            logger.info(
              "removeMachineDetailsChild error  " + JSON.stringify(err)
            );
            status = false;
          } else {
            status = true;
            logger.info(
              "removeMachineDetailsChild  result  " + JSON.stringify(result)
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
  getMachineDetailsChild: function(req, res) {
    var data = req.body;
    dbconnection.query("SELECT * FROM machine_details_child", function(
      err,
      result
    ) {
      let status;
      if (err) {
        logger.info("getMachineDetailsChild error  " + JSON.stringify(err));
        status = false;
      } else {
        status = true;
        logger.info("getMachineDetailsChild result  " + JSON.stringify(result));
      }
      utils.sendResponse(res, {
        status: status,
        data: result,
        err: err
      });
    });
  }
  /******** MACHINEDETAILSCHILD CRUD  ***************/
};

module.exports = machineDetailsChild;
