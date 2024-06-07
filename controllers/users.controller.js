const bycrpt = require('bcrypt');
const { User } =  require('../models/user.model');

// to register a new user
async function register(req,res){  

  let user = new User({
    username : req.body.username,
    email : req.body.email,
    passwordHash : bycrpt.hashSync(req.body.password,10)
  })

  user = await user.save();

  if(!user){
    return res.status(404).json({
      message : "User is not created"
    })
  }
  return res.status(200).json(user)
}

module.exports = {
  register
}