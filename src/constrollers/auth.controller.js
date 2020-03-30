const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { verifyToken } = require('./verifytoken');

router.post('/signup', async (req, res) => {
   const { username, email, password } = req.body;
   const newUser = new User({
       username,
       email,
       password
   });
   newUser.password = await newUser.encryptPassword(newUser.password)
   await newUser.save();
   const token = jwt.sign({id: newUser._id}, config.secret, { expiresIn: 60 * 60 * 24 }) //Create token
   res.json({auth: true, token}); 
});

router.get('/me', verifyToken ,async (req, res, next) => {
    const user = await User.findById(req.userId, { password: 0 })
    if(!user) {
        return res.status(404).json({message:'No user found'})
    }
    res.json(user);
});

router.post('/signin', async (req, res, next) => {
    const { email, password} = req.body
    const user = await User.findOne({email: email});
    if(!user) { 
        return res.status(404).json({message: 'Email does not exists'})
    }
    const validPass = await user.validatePassword(password);
    if(!validPass) { 
        return res.status(401).json({auth:false, token:null});
    }
    const token = jwt.sign({id: user._id}, config.secret, {expiresIn: 60 * 60 * 24});
    res.json({auth: true, token});
    
});


router.get('/db', async (req,res) => {
   const users = await User.find();
   res.json(users);
});

module.exports = { router };