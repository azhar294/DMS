const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  password: String,
  superUser : {type : Boolean, default : false}
},{timestamps : true});



mongoose.model('User', UserSchema);

