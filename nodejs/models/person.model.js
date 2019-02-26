var mongoose = require("mongoose");

const personInfoSchema = mongoose.Schema({
    PersonId:Number,
    FirstName: String,
    MiddleName: String,
    LastName: String,
    Gender: String,
    DateOfBirth: String,
    Age: Number, 
    FlatNumber: String,
    SocietyName: String,
    AreaName: String,    
    Email:  String,
    City: String,
    State: String,
    PinCode: Number,
    PhoneNo: Number,                 
    MobileNo: Number,
    PhysicalDisability: String,
    MaritalStatus: String,
    Education: String,
    BirthSign:String,                        
    IsAuthorized: String,
    status: String,
    userId: Number
  });
  
var perInfo =  mongoose.model("PersonInfo", personInfoSchema, "PersonInfo");
module.exports = perInfo;

var tempPersonInfo =  mongoose.model("TempPersonInfo", personInfoSchema, "TempPersonInfo");
module.exports = tempPersonInfo;