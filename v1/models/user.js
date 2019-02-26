var mongoose           = require("mongoose"),
passportLocalMongoose  = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username:String,
    password:String
});

UserSchema.plugin(passportLocalMongoose); // To use passport local mongoose
module.exports = mongoose.model("User",UserSchema);