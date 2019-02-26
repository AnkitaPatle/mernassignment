var mongoose = require("mongoose");

var loginStatusSchema = mongoose.Schema({
    LoginStatusId: Number,
    UserName: String,
    LoginFrom: String,
    DateTime: String,
    IpAddress: String
})

module.exports = mongoose.model("LoginStatus", loginStatusSchema, "LoginStatus")