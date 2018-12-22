var express = require("express");
var router = express.Router();
var user = require(basePath + "controllers/user");
var company = require(basePath + "controllers/company");
var options = require(basePath + "controllers/options");
var machineFields = require(basePath + "controllers/machineFields");
var reason = require(basePath + "controllers/reason");
var machineDetails = require(basePath + "controllers/machineDetails");
var machineDetailsChild = require(basePath + "controllers/machineDetailsChild");
var issues = require(basePath + "controllers/issues");
var complain = require(basePath + "controllers/complain");
var complainDetails = require(basePath + "controllers/complainDetails");

var loginAuth = require(basePath + "helper/auth");
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();

router.route("/adminLogin").post(company.adminLogin);
router.route("/addCompany").post(company.addCompany);
router.route("/editCompany").post(company.editCompany);
router.route("/getCompanies").post(company.getCompanies);
router.route("/removeCompany").post(company.removeCompany);

router.route("/userLogin").post(user.userLogin);
router.route("/addUser").post(loginAuth.requiresLogin, user.addUser);
// router.route("/addUser").post(user.addUser);
router.route("/editUser").post(user.editUser);
router.route("/getUsers").post(user.getUsers);
router.route("/removeUser").post(user.removeUser);

router.route("/addOptions").post(options.addOptions);
router.route("/editOptions").post(options.editOptions);
router.route("/getOptions").post(options.getOptions);
router.route("/removeOptions").post(options.removeOptions);

router.route("/addMachineFields").post(machineFields.addMachineFields);
router.route("/editMachineFields").post(machineFields.editMachineFields);
router.route("/getMachineFields").post(machineFields.getMachineFields);
router.route("/removeMachineFields").post(machineFields.removeMachineFields);

router.route("/addReason").post(reason.addReasons);
router.route("/editReason").post(reason.editReasons);
router.route("/getReason").post(reason.getReasons);
router.route("/removeReason").post(reason.removeReasons);

router.route("/addMachineDetails").post(machineDetails.addMachineDetails);
router.route("/editMachineDetails").post(machineDetails.editMachineDetails);
router.route("/getMachineDetails").post(machineDetails.getMachineDetails);
router.route("/removeMachineDetails").post(machineDetails.removeMachineDetails);

router
  .route("/addMachineDetailsChild")
  .post(machineDetailsChild.addMachineDetailsChild);
router
  .route("/editMachineDetailsChild")
  .post(machineDetailsChild.editMachineDetailsChild);
router
  .route("/getMachineDetailsChild")
  .post(machineDetailsChild.getMachineDetailsChild);
router
  .route("/removeMachineDetailsChild")
  .post(machineDetailsChild.removeMachineDetailsChild);

router.route("/addIssues").post(issues.addIssues);
router.route("/editIssues").post(issues.editIssues);
router.route("/getIssues").post(issues.getIssues);
router.route("/removeIssues").post(issues.removeIssues);

router.route("/addComplain").post(complain.addComplain);
router.route("/editComplain").post(complain.editComplain);
router.route("/getComplain").post(complain.getComplain);
router.route("/removeComplain").post(complain.removeComplain);

router.route("/addComplainDetails").post(complainDetails.addComplainDetails);
router.route("/editComplainDetails").post(complainDetails.editComplainDetails);
router.route("/getComplainDetails").post(complainDetails.getComplainDetails);
router
  .route("/removeComplainDetails")
  .post(complainDetails.removeComplainDetails);

//router.param('id', user.user);
// router.route('/authenticate').post(user.authenticate);
// router.route('/user').post(multipartMiddleware ,user.create);
// router.route('/user/update').post(multipartMiddleware, user.update);
//router.post('/product', multipartMiddleware, product.create); //Create new user

module.exports = router;
