_ = require("lodash");
var utils = require(basePath + "helper/utils");

var machineFields = {
  /******** MachineFields CRUD  ***************/
  addMachineFields: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.field_name)) {
      var insertData = {
        // fields_id: data.fields_id,
        field_name: data.field_name,
        field_type: data.field_type,
        options_id: data.option_id,
        reasons_id: data.options_id
      };

      dbconnection.query(
        "INSERT INTO machine_fields SET ?",
        insertData,
        function(err, result) {
          let status;
          if (err) {
            logger.info("add addMachineFields error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info(
              "add addMachineFields result  " + JSON.stringify(result)
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
        data: "Please provide field_name."
      });
    }
  },
  editMachineFields: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.fields_id)) {
      var insertData = {
        // fields_id: data.fields_id,
        field_name: data.field_name,
        field_type: data.field_type,
        options_id: data.option_id,
        reasons_id: data.options_id
      };

      dbconnection.query(
        "UPDATE machine_fields SET ? WHERE fields_id = " + data.fields_id,
        insertData,
        function(err, result) {
          let status;
          if (err) {
            logger.info("editMachineFields error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info("editMachineFields result  " + JSON.stringify(result));
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
        data: "Please provide valid fields_id."
      });
    }
  },
  removeMachineFields: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.fields_id)) {
      dbconnection.query(
        "DELETE FROM machine_fields WHERE fields_id = " + data.fields_id,
        function(err, result) {
          let status;
          if (err) {
            logger.info("removeMachineFields error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info(
              "removeMachineFields  result  " + JSON.stringify(result)
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
        data: "Please provide valid fields_id"
      });
    }
  },
  getMachineFields: function(req, res) {
    var data = req.body;
    dbconnection.query("SELECT * FROM machine_fields", function(err, result) {
      let status;
      if (err) {
        logger.info("getMachineFields error  " + JSON.stringify(err));
        status = false;
      } else {
        status = true;
        logger.info("getMachineFields result  " + JSON.stringify(result));
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

module.exports = machineFields;
