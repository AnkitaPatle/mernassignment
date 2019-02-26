var mongoose = require("mongoose");

var rolesSchema = mongoose.Schema({
    RoleId: Number,
    RoleName: String
  });
  
module.exports = mongoose.model("Roles", rolesSchema, "Roles");