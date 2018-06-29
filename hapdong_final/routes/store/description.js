// 가게 정보 불러오기 (GET)
// Header: store_idx (가게 인덱스)

var express=require('express');
var router=express.Router();
const request=require('async-request');
var pool=require('../../module/pool.js')


router.get('/:store_idx',async(req,res)=>{
		console.log('description');
	let getDescriptionQuery='SELECT store_info FROM store where store_idx=?';
	let getDescription=await pool.queryParam_None(getDescriptionQuery);

	if(!getDescription){
		res.status(500).send({
			message:"Internal Server Error"
		});
	}else{
		res.status(200).send({
			message:"success",
			data:getDescription
		});
	}
});


module.exports=router;
