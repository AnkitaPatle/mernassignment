var mongoose = require("mongoose");

var userSchema=mongoose.Schema({
    UserId: Number,
    UserName: String,
    EmailAddress: String,
    Password: String,
    RoleId: Number
});

module.exports=mongoose.model("Users",userSchema,"Users");