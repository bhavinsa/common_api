var jwt = require("jwt-simple");
var secret = "12@sa#^5sd34sdf989dkhk21weqksdf{23}{2eghvasaxfj";

/*
 * For Create Secret Token For User
 * @param Int uid Uid
 * @return String
 */
exports.createSecretToken = function(uid) {
  var token = jwt.encode({ uid: uid }, secret);
  return token;
};

/*
 * For Get User ID Form SecretToken
 * @param Int uid Uid
 * @return String
 */

exports.getUserIdFormSecretToken = function(token) {
  var userID = "";
  if (token) {
    try {
      var decoded = jwt.decode(token, secret);
      userID = decoded.uid;
    } catch (err) {
      userID;
    }
  }

  return userID;
};
