const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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