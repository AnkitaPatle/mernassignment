var mongoose = require("mongoose");
    //autoIncrement = require("mongoose-auto-increment");
var personmod = require("./../models/person.model");
var personInfoModel = mongoose.model("PersonInfo");
var tempPersonInfoModel = mongoose.model("TempPersonInfo");
    //connection = require("./../userinfowebserver");

//autoIncrement.initialize(connection);

module.exports={

    getPersonInfo:function(request, response){

        personInfoModel.find().exec(function(err,res){
            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }
            response.send({status:200, data:res});
        });
    },

    getPersonInfoById:function(request, response){ 
        var UserId={
            UserId: request.params.UserId
        }
        //console.log("getPersonInfoById"+userId);

        personInfoModel.findOne(UserId).exec(function(err,res){
            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }
            response.send({status:200, data:res});
        });
    },

    postPersonalInfo:function(request, response){
        var UserRole = request.body.UserRole;   //get userrole admin/operator
        if(UserRole == "Admin"){
        var personInfo = {
            PersonId: request.body.PersonId,
            FirstName: request.body.FirstName,
            MiddleName: request.body.MiddleName,
            LastName: request.body.LastName,            
            Gender: request.body.Gender,
            DateOfBirth: request.body.DateOfBirth,
            Age:  request.body.Age,            
            FlatNumber: request.body.FlatNumber,
            SocietyName: request.body.SocietyName,
            AreaName: request.body.AreaName,            
            Email: request.body.Email,
            City: request.body.City,
            State: request.body.State,
            PinCode: request.body.PinCode,
            PhoneNo: request.body.PhoneNo,                 
            MobileNo:request.body.MobileNo,
            PhysicalDisability:request.body.PhysicalDisability,                 
            MaritalStatus:request.body.MaritalStatus,
            Education: request.body.Education,
            BirthSign:request.body.BirthSign,   
            UserId:request.body.UserId,                    
            IsAuthorized: request.body.IsAuthorized,            
            status: "approved"
        }

        console.log(personInfo);

            //personInfoModel.plugin(autoIncrement.plugin, {model: 'personInfo', field: 'personId'});

            personInfoModel.create(personInfo, function(err,res){
                    if(err){
                        response.status = 500;
                        response.send({status:response.status, error:err});
                    }
                    response.send({status:200, Message:"Person Information Added Successfully"});
                });
        }
        else{
            var personInfo = {
                PersonId: request.body.PersonId,
                FirstName: request.body.FirstName,
                MiddleName: request.body.MiddleName,
                LastName: request.body.LastName,            
                Gender: request.body.Gender,
                DateOfBirth: request.body.DateOfBirth,
                Age:  request.body.Age,            
                FlatNumber: request.body.FlatNumber,
                SocietyName: request.body.SocietyName,
                AreaName: request.body.AreaName,            
                Email: request.body.Email,
                City: request.body.City,
                State: request.body.State,
                PinCode: request.body.PinCode,
                PhoneNo: request.body.PhoneNo,                 
                MobileNo:request.body.MobileNo,
                PhysicalDisability:request.body.PhysicalDisability,                 
                MaritalStatus:request.body.MaritalStatus,
                Education: request.body.Education,
                BirthSign:request.body.BirthSign,  
                UserId:request.body.UserId,                     
                IsAuthorized: request.body.IsAuthorized,
                status: "pending"

        }
            tempPersonInfoModel.create(personInfo, function(err,res){
                    if(err){
                        response.status = 500;
                        response.send({status:response.status, error:err});
                    }
                    response.send({status:200, Message:"Person Information Added Successfully. Approve will soon."});
                });
        }
          
    },


    putPersonInfo:function(request, response){
        var personInfo = {
            PersonId: request.body.PersonId,
            FirstName: request.body.FirstName,
            MiddleName: request.body.MiddleName,
            LastName: request.body.LastName,            
            Gender: request.body.Gender,
            DateOfBirth: request.body.DateOfBirth,
            Age:  request.body.Age,            
            FlatNumber: request.body.FlatNumber,
            SocietyName: request.body.SocietyName,
            AreaName: request.body.AreaName,            
            Email: request.body.Email,
            City: request.body.City,
            State: request.body.State,
            PinCode: request.body.PinCode,
            PhoneNo: request.body.PhoneNo,                 
            MobileNo:request.body.MobileNo,
            PhysicalDisability:request.body.PhysicalDisability,                 
            MaritalStatus:request.body.MaritalStatus,
            Education: request.body.Education,
            BirthSign:request.body.BirthSign,                       
            IsAuthorized: request.body.IsAuthorized
        }

        tempPersonInfoModel.create(personInfo, function(err,res){
            if(err){
                respose.status = 500;
                response.send({status:response.status, error:err});
            }
            response.send({status:200, Message:"Personal Information Updated Successfully. Approve will soon."});
        });
           
    },

    getPersonInfoByUserId: function(request, response){  
        let UserId ={
            UserId: request.params.UserId   
        }

        personInfoModel.findOne(UserId).exec(function(err, res){
            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }
            response.send({status:200, data:res});
        });
    },

    getPersonInfoByStatus: function(request, response){
        var reqStatus = request.params.status;
        var persInfo=[];

        if(reqStatus==="approved"){
            personInfoModel.find().exec(function(err,res){
                if(err){
                    response.status = 500;
                    response.send({status:response.status, error:err});
                }
                else{
                    
                    for(var i=0; i<res.length; i++){
                        persInfo[i] = {
                            UserId:res[i].UserId,
                            FullName:res[i].FirstName+" "+res[i].MiddleName+" "+res[i].LastName,
                            DateOfBirth:res[i].DateOfBirth,
                            MobileNo:res[i].MobileNo,
                            Email:res[i].Email,
                            City:res[i].City,
                            status:res[i].status
                        }
                    }
                    response.send({status:200, data:persInfo});
                } 
            });
            } 
        else{
            var condition = {status:reqStatus}
            tempPersonInfoModel.find(condition).exec(function(err,res){
                if(err){
                    response.status = 500;
                    response.send({status:response.status, error:err});
                }
                else{
                    
                    for(var i=0; i<res.length; i++){
                        persInfo[i] = {
                            UserId:res[i].UserId,
                            FullName:res[i].FirstName+" "+res[i].MiddleName+" "+res[i].LastName,
                            DateOfBirth:res[i].DateOfBirth,
                            MobileNo:res[i].MobileNo,
                            Email:res[i].Email,
                            City:res[i].City,
                            status:res[i].status
                        }
                    }
                    response.send({status:200, data:persInfo});
                }
            });
        }

    },

    doApprovePerson: function(request, response){
        UserId={
            UserId:request.params.UserId
        }

        tempPersonInfoModel.find(UserId).exec(function(err,res){
            
            if(res.length > 0) {
            var personInfo = {
                PersonId:res[0].PersonId,
                FirstName: res[0].FirstName,
                MiddleName: res[0].MiddleName,
                LastName: res[0].LastName,
                Gender: res[0].Gender,
                DateOfBirth: res[0].DateOfBirth,
                Age:  res[0].Age,
                FlatNumber: res[0].FlatNumber,
                SocietyName: res[0].SocietyName,
                AreaName: res[0].AreaName,
                Email: res[0].Email,
                City: res[0].City,
                State: res[0].State,
                PinCode: res[0].PinCode,
                PhoneNo: res[0].PhoneNo,                 
                MobileNo: res[0].MobileNo,
                PhysicalDisability: res[0].PhysicalDisability,                 
                MaritalStatus: res[0].MaritalStatus,
                Education: res[0].Education,
                BirthSign: res[0].BirthSign,  
                UserId: res[0].UserId,                     
                IsAuthorized: res[0].IsAuthorized,
                status:"approved"
            }

            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }

            //console.log(JSON.stringify(personInfo));

            personInfoModel.create(personInfo, function(err,res){
                if(err){
                    response.status = 500;
                    response.send({status:response.status, error:err});
                }
            });
        
            tempPersonInfoModel.deleteOne(UserId, function(err,res){
                if(err){
                    response.status = 500;
                    response.send({status:response.status, error:err});
                }
            });
            response.send({status: 200, message:"Person Information has been approved..!"});
            }
        });
    },

    doRejectPerson: function(request, response){
        UserId={
            UserId:request.params.UserId
        }

        tempPersonInfoModel.deleteOne(UserId, function(err,res){
            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }
            response.send({status: 200, data: res, message:"Person Information has been rejected..!"})
        });

    }
}