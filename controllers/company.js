_ = require("lodash");
var utils = require(basePath + "helper/utils");

var company = {
  /******** COMPANY CRUD  ***************/
  addCompany: function(req, res) {
    var data = req.body;
    if (
      utils.isDefined(data.company_name) &&
      utils.isDefined(data.company_address)
    ) {
      var insertData = {
        company_name: data.company_name,
        company_address: data.company_address,
        company_city: data.company_city,
        company_state: data.company_state,
        company_pincode: data.company_pincode,
        company_phone: data.company_phone,
        company_mobile: data.company_mobile,
        company_email: data.company_email
      };

      dbconnection.query("INSERT INTO company SET ?", insertData, function(
        err,
        result
      ) {
        let status;
        if (err) {
          logger.info("add company error  " + JSON.stringify(err));
          status = false;
        } else {
          status = true;
          logger.info("add company result  " + JSON.stringify(result));
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
        data: "Please provide company name, address."
      });
    }
  },
  editCompany: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.company_id)) {
      var insertData = {
        company_name: data.company_name,
        company_address: data.company_address,
        company_city: data.company_city,
        company_state: data.company_state,
        company_pincode: data.company_pincode,
        company_phone: data.company_phone,
        company_mobile: data.company_mobile,
        company_email: data.company_email
      };

      dbconnection.query(
        "UPDATE company SET ? WHERE company_id = " + data.company_id,
        insertData,
        function(err, result) {
          let status;
          if (err) {
            logger.info("edit company error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info("edit company result  " + JSON.stringify(result));
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
  removeCompany: function(req, res) {
    var data = req.body;
    if (utils.isDefined(data.company_id)) {
      dbconnection.query(
        "DELETE FROM company WHERE company_id = " + data.company_id,
        function(err, result) {
          let status;
          if (err) {
            logger.info("removeCompany company error  " + JSON.stringify(err));
            status = false;
          } else {
            status = true;
            logger.info(
              "removeCompany company result  " + JSON.stringify(result)
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
        data: "Please provide valid company id."
      });
    }
  },
  getCompanies: function(req, res) {
    var data = req.body;
    dbconnection.query("SELECT * FROM company", function(err, result) {
      let status;
      if (err) {
        logger.info("getCompanies company error  " + JSON.stringify(err));
        status = false;
      } else {
        status = true;
        logger.info("getCompanies company result  " + JSON.stringify(result));
      }
      utils.sendResponse(res, {
        status: status,
        data: result,
        err: err
      });
    });
  },
  adminLogin: function(req, res) {
    var data = req.body;
    console.log(JSON.stringify(data));
    let password = utils.encrypt(data.password);
    let query =
      "SELECT * FROM admin_user WHERE email_id= " +
      "?" +
      "  and password= " +
      "?";
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

  /******** COMPANY CRUD  ***************/
};

module.exports = company;
