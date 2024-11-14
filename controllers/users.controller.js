const bycrpt = require('bcrypt');
const { User } =  require('../models/user.model');
const jwt = require('jsonwebtoken')

// to register a new user
async function register(req,res){  

  let user = new User({
    username : req.body.username,
    email : req.body.email,
    passwordHash : bycrpt.hashSync(req.body.password,10),
    isAdmin : req.body.isAdmin
  })

  const alreadyAUser = await User.findOne({
    email: req.body.email
  })
  
  if(alreadyAUser){
    return res.status(401).send('Already a User')
  }

  user = await user.save();

  if(!user){
    return res.status(404).json({
      message : "User is not created"
    })
  }
  return res.status(200).json(user)
}

// login a user
async function login(req, res) {

  const user = await User.findOne({
    email: req.body.email
  })

  if (!user) {
    return res.status(401).send('User not found')
  }

  const secret = process.env.secret;

  // if user found and password matches
  if (user && bycrpt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign({
      userId: user.id,
      isAdmin: user.isAdmin
    }, secret, {
      expiresIn: '1d'
    })

    return res.status(200).send({
      user: user.email,
      token: token
    })
    
  } else {
    return res.status(401).send('Password is Wrong')
  }

}

module.exports = {
  register,
  login
}