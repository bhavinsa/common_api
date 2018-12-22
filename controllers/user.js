_ = require("lodash");
var utils = require(basePath + "helper/utils");

var user = {
  /******** USER CRUD  ***************/
  addUser: function(req, res) {
    var data = req.body;
    if (
      utils.isDefined(data.name) &&
      utils.isDefined(data.email_id) &&
      utils.isDefined(data.password)
    ) {
      let query =
        'SELECT * FROM `user` WHERE email_id="' +
        data.email_id +
        '" and company_id=' +
        data.company_id;

      console.log(query);
      dbconnection.query(query, function(err, result) {
        if (err) {
          logger.info("add user check exist error  " + JSON.stringify(err));
        } else {
          resultData = JSON.stringify(result);
          if (result[0] != undefined) {
            logger.info(data.email_id + "is exist in system database.");
            utils.sendResponse(res, {
              status: false,
              data: data.email_id + " is exist in system database."
            });
          } else {
            var insertData = {
              name: data.name,
              email_id: data.email_id,
              password: utils.encrypt(data.password),
              mobile: data.mobile,
              user_type: data.user_type,
              company_id: data.company_id
            };

            dbconnection.query("INSERT INTO user SET ?", insertData, function(
              err,
              result
            ) {
              let status;
              if (err) {
                logger.info("add user error  " + JSON.stringify(err));
                status = false;
              } else {
                status = true;
                logger.info("add user result  " + JSON.stringify(result));
              }
              utils.sendResponse(res, {
                status: status,
                data: result,
                err: err
              });
            });
          }
        }
      });
    } else {
      utils.sendResponse(res, {
        status: false,
        data: "Please provide user name, email id, password."
      });
    }
  },
  editUser: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.user_id)) {
      let query =
        'SELECT * FROM `user` WHERE email_id="' +
        data.email_id +
        '" and company_id=' +
        data.company_id +
        " and id !=" +
        data.user_id;

      console.log(query);
      dbconnection.query(query, function(err, result) {
        if (err) {
          logger.info("edit user check exist error  " + JSON.stringify(err));
        } else {
          resultData = JSON.stringify(result);
          if (result[0] != undefined) {
            logger.info(data.email_id + "is exist in system database.");
            utils.sendResponse(res, {
              status: false,
              data: data.email_id + " is exist in system database."
            });
          } else {
            var insertData = {
              name: data.name,
              email_id: data.email_id,
              password: utils.encrypt(data.password),
              mobile: data.mobile,
              user_type: data.user_type,
              company_id: data.company_id
            };

            dbconnection.query(
              "UPDATE user SET ? WHERE id = " + data.user_id,
              insertData,
              function(err, result) {
                let status;
                if (err) {
                  logger.info("edit user error  " + JSON.stringify(err));
                  status = false;
                } else {
                  status = true;
                  logger.info("edit user result  " + JSON.stringify(result));
                }
                utils.sendResponse(res, {
                  status: status,
                  data: result,
                  err: err
                });
              }
            );
          }
        }
      });
    } else {
      utils.sendResponse(res, {
        status: false,
        data: "Please provide valid user id."
      });
    }
  },
  removeUser: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.user_id)) {
      dbconnection.query(
        "DELETE FROM user WHERE id = " + data.user_id,
        function(err, result) {
          let status;
          if (err) {
            logger.info("removeUser error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info("removeUser result  " + JSON.stringify(result));
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
        data: "Please provide valid company id."
      });
    }
  },
  getUsers: function(req, res) {
    var data = req.body;
    dbconnection.query("SELECT * FROM user", function(err, result) {
      let status;
      if (err) {
        logger.info("getUsers error  " + JSON.stringify(err));
        status = false;
      } else {
        status = true;
        logger.info("getUsers result  " + JSON.stringify(result));
      }
      utils.sendResponse(res, {
        status: status,
        data: result,
        err: err
      });
    });
  },
  userLogin: function(req, res) {
    var data = req.body;
    console.log(JSON.stringify(data));
    let password = utils.encrypt(data.password);
    let query =
      "SELECT * FROM user WHERE email_id= " + "?" + "  and password= " + "?";
    dbconnection.query(query, [data.email_id, password], function(err, rows) {
      let status;
      let secret_token;
      if (err) {
        logger.info("userLogin error  " + JSON.stringify(err));
        status = false;
      } else {
        status = true;
        logger.info("userLogin result  " + JSON.stringify(rows));
        if (rows !== undefined && rows.length > 0) {
          var userData = rows[0];
          secret_token = jwt.createSecretToken(userData.id);

          utils.sendResponse(res, {
            status: status,
            secret_token: secret_token,
            data: rows,
            err: err
          });
        } else {
          utils.sendResponse(res, {
            status: false,
            secret_token: secret_token,
            data:
              "You have provided incorrect details, Please enter correct details.",
            err: err
          });
        }
      }
    });
  }

  /******** USER CRUD  ***************/
};

module.exports = user;
