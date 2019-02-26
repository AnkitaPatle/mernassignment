var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var datetime = require("node-datetime");

var usermod = require("./../models/users.model");
var instance = require("../server");

var rolmod = require("./../models/roles.model");
var RoleModel = mongoose.model("Roles");

var loginstatusmod = require("./../models/loginstatus.model");
var loginStatusModel = mongoose.model("LoginStatus");

const iplocation = require("iplocation").default;
var userModel = mongoose.model("Users");

module.exports = {
  authUser: function(request, response) {
    var user = {
      UserName: request.body.UserName,
      Password: request.body.Password
    };

    //console.log(user);

    userModel.findOne({ UserName: request.body.UserName }, function(err, usr) {
      if (err) {
        response.send({ status: 500, error: err });
      }

      if (!usr) {
        response.send({ status: 400, message: "Sorry, User not found...!" });
      } else if (usr) {
        if (usr.Password !== user.Password) {
          response.send({
            status: 404,
            message: "Sorry, UserName and Password does not match..!"
          });
        } else {
          var token = jwt.sign({ usr }, instance.get("jwtSecret"), {
            expiresIn: 3600
          });
          tokenStore = token;
          
          
          
          response.send({
            status:200,
            authenticated: true,
            message: "Login Success",
            token: tokenStore,
            RoleId: usr.RoleId,
            UserName: usr.UserName
  
          });
        }
      }
    });
  },

  verifyUser: function(tokenReceived) {
    var returnToken;

    jwt.verify(tokenReceived, instance.get("jwtSecret"), function(
      err,
      decoded
    ) {
      if (err) {
        returnToken = false;
      } else {
        returnToken = true;
      }
    });

    return returnToken;
  }
};
