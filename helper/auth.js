var jwt = require(basePath + "helper/jwt");

exports.requiresLogin = function(req, res, next) {
  var token =
    (req.body && req.body.secret_token) ||
    (req.query && req.query.secret_token);
  if (token != undefined && token != null) {
    console.log(token);
    var uid = jwt.getUserIdFormSecretToken(token);
    if (uid) {
      dbconnection.query("SELECT * FROM user where id = ?" + uid, function(
        err,
        result
      ) {
        let status;
        if (err) {
          logger.info("requiresLogin user error  " + JSON.stringify(err));
        } else {
          logger.info("requiresLogin user result  " + JSON.stringify(result));
          if (result[0] != undefined) {
            // next();

            dbconnection.query(
              "SELECT * FROM admin where id = ?" + uid,
              function(err, adminResult) {
                let status;
                if (err) {
                  logger.info(
                    "requiresLogin admin error  " + JSON.stringify(err)
                  );
                } else {
                  logger.info(
                    "requiresLogin admin result  " + JSON.stringify(adminResult)
                  );
                  if (adminResult[0] != undefined) {
                    next();
                  } else {
                    response = {
                      success: 0,
                      auth_status: 401,
                      message: "Secret token is not valid, Please login again."
                    };
                    utils.sendResponse(res, response);
                  }
                }
              }
            );
          } else {
            response = {
              success: 0,
              auth_status: 401,
              message: "Secret token is not valid, Please login again."
            };
            utils.sendResponse(res, response);
          }
        }
      });
    } else {
      response = {
        success: 0,
        message: "secret token is not valid."
      };
      utils.sendResponse(res, response);
    }
  } else {
    response = {
      success: 0,
      message: "Token has been expired."
    };
    utils.sendResponse(res, response);
  }
};
