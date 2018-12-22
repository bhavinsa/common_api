var fs = require("fs");
var path = require("path");
var utils = require(basePath + "helper/utils");
var crypto = require("crypto");

var utils = {
  getDate: function() {
    if (!Date.now) {
      Date.now = function() {
        return new Date().getTime();
      };
    } else {
      return new Date().getTime();
    }
  },
  isDefined: function(variable) {
    if (typeof variable == "boolean") return true;
    return typeof variable !== undefined && variable != null && variable != "";
  },
  sendResponse: function(res, response, status) {
    var response = JSON.stringify(response);
    var status = utils.isDefined(status) ? status : 200;
    res.setHeader("Content-Type", "application/json");
    res.status(status);
    res.end(response);
  },
  sendEmail: function(toEmail, subject, body, callback) {
    smtpTransport = nodemailer.createTransport();
    var isEmailSent = false;
    smtpTransport.sendMail(
      {
        from: "test@example.com",
        to: toEmail,
        subject: subject,
        html: body
      },
      function(error, response) {
        if (error) {
          isEmailSent = true;
        } else {
          isEmailSent = false;
        }
        callback(null, isEmailSent);
      }
    );
  },
  uploadUserImage: function(file, userID, userImageDir, callback) {
    var imageMessage = "";
    var oldFilename = file.image.path;
    var fileName = file.image.name;
    var extension = utils.getExtension(fileName);
    var baseFileName = path.basename(fileName, extension);
    var newFilename =
      utils.encrypt(baseFileName + userID) + path.extname(fileName);
    if (!fs.existsSync(userImageDir)) {
      fs.mkdirSync(userImageDir);
    }
    var newPath = userImageDir + newFilename;
    var mv = require("mv");
    // require('fs').rename(oldFilename, newPath, function (error) {
    mv(oldFilename, newPath, function(error) {
      if (error) {
        console.log("Image Error -->" + JSON.stringify(error));
        callback(null, {
          error: appMessage.IMAGE_NOT_UPLOAD,
          fileName: fileName
        });
      } else {
        //delete tmp file
        fs.unlink(oldFilename, function() {});
        callback(null, {
          error: null,
          fileName: newFilename
        });
        callback(null, newFilename);
      }
    });
  },
  checkForValidImage: function(file, callback) {
    if (!utils.isDefined(file.user_image)) {
      var imageMessage = "";
      var oldFilename = file.user_image.path;
      var fileName = file.user_image.name;
      var extension = this.getExtension(fileName);
      var allowExtension = ["jpg", "png", "jpeg", "gif"];

      if (file.user_image.size < 1000000) {
        if (allowExtension.indexOf(extension.toLowerCase()) == -1) {
          callback(null, {
            error: appMessage.IMAGE_NOT_VALID,
            fileName: fileName
          });
        } else {
          callback(null, {
            error: "",
            fileName: fileName
          });
        }
      } else {
        callback(null, {
          error: appMessage.IMAGE_LARGE,
          fileName: fileName
        });
      }
    } else {
      callback(null, {
        error: appMessage.IMAGE_EMPTY,
        fileName: fileName
      });
    }
  },
  createResponse: function(response) {
    return JSON.stringify(response);
  },
  getExtension: function(fileName) {
    var ext = path.extname(fileName || "").split(".");
    return ext[ext.length - 1];
  },
  encrypt: function(text) {
    var cipher = crypto.createCipher(
      "aes-256-cbc",
      process.env.CRYPTO_PASSWORD
    );
    var crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  }
  //    newDate: function (date) {
  //        process.env.TZ = "UTC";
  //        var newTime = date.getTime()
  //        var finalDate = new time.Date(newTime);
  //        finalDate.setTimezone('UTC');
  //        console.log(finalDate.toString());
  //    }
};

module.exports = utils;
