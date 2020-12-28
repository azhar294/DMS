const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  passwordHash: String,
  superUser : {type : Boolean, default : false}
},{timestamps : true});



mongoose.model('User', UserSchema);

