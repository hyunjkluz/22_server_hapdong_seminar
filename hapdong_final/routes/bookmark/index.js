const express=require('express');
const router=express.Router();

// 1. 북마크 등록
const add=require('./add.js');
router.use('/add',add);

// 2. 북마크 리스트
const list=require('./list.js');
router.use('/list',list);


module.exports=router;

