var mongoose = require("mongoose");

var usermod = require("../models/users.model");

var UserModel = mongoose.model("Users");

module.exports ={
   // Get Users function returns all users
    getUsers: function(request,response){

        UserModel.find().exec(function(err, res) {
            if (err) {
                response.statuscode = 404;
                response.send({ status: response.statuscode, error: err });
              }

              response.statuscode = 200;
              response.send({ status: response.statuscode, data: res });
        })
    },


    postUser: function(request, response){
        
        let user={
            UserId: request.body.UserId,
            UserName: request.body.UserName,
            EmailAddress: request.body.EmailAddress,
            Password: request.body.Password,
            RoleId: request.body.RoleId
        }

        //console.log("in user logic:"+JSON.stringify(user));
        
            UserModel.findOne({UserName: request.body.UserName},function(err, respUser){
                if(respUser != null){
                    response.statuscode = 200;
                    response.send({ status: response.statuscode, message: "User already exist..!" });
                } else{
                     UserModel.create(user, function(err, res){
                        if (err) {
                            response.statuscode = 404;
                            response.send({ status: response.statuscode, error: err });
                        }
                        
                        response.statuscode = 200;
                        response.send({ status: response.statuscode, data: res });
                    });
                }
        });
    },


    updateUser: function(request, response){
        
        let user={
            UserId: request.body.UserId,
            UserName: request.body.UserName,
            EmailAddress: request.body.EmailAddress,
            Password: request.body.Password,
            RoleId: request.body.RoleId
        }
        let condition= {
            UserId: request.params.id
        }

        UserModel.updateOne(condition, user, function(err, res){
            if (err) {
                response.statuscode = 404;
                response.send({ status: response.statuscode, error: err });
              }
            
              response.statuscode = 200;
              response.send({ status: response.statuscode, data: res });
        });
    },


    deleteUser: function(request, response){
       
        let condition= {
            UserId: request.params.id
        }

        UserModel.deleteOne(condition, function(err, res){
            if (err) {
                response.statuscode = 404;
                response.send({ status: response.statuscode, error: err });
              }
             
              response.statuscode = 200;
              response.send({ status: response.statuscode, data: res });
        });
    }
}