const express=require('express');
const router=express.Router();

// 카테고리 리스트 불러오기
const list = require('./list.js');

router.use('/list', list);


module.exports=router;

