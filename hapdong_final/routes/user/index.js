const express=require('express');
const router=express.Router();

// 로그인
const signin = require('./signin.js');
const signup = require('./signup.js');

router.use('/signin', signin);
router.use('/signup', signup);
//ip:3000/user/siginin or signup


module.exports=router;

