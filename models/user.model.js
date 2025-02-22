const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true
  }, 
  email : {
    type : String,
    required : true
  },
  passwordHash : {
    type : String,
    required : true
  },
  
  isAdmin : {
    type : Boolean,
    default : false,
  },

  createdAt : {
    type : Date,
    default : Date.now()
  }
})


userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
});

exports.User = mongoose.model('User',userSchema);
exports.userSchema = userSchema;