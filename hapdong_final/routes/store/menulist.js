// 메뉴 리스트 불러오기 (GET)

var express=require('express');
var router=express.Router();
const request=require('async-request');
var pool=require('../../bin/dbPool');

router.get('/:store_idx',function(req,res){

	return new Promise((fulfill,reject)=>{
		pool.getConnection((err,connection)=>{
			if(err) reject(err);
			else fulfill(connection);
		});
	})
	.catch(err=>{res.status(500).send({message:"getConnectionError "+err});})
	.then((connection)=>{
		return new Promise((fulfill,reject)=>{
			// 1. 특정 가게 가져오기
			var query='select * from store where store_idx=?';
			connection.query(query,req.params.store_idx,(err,data)=>{
				if(err) reject(err);
				else{
					if(data[0]) fulfill(connection);
					else res.status(500).send({message:"no store"});
				}
			});
		});
	})
	.catch(err=>{res.status(500).send({message: "getConnectionError "+err});})
	.then((connection)=>{
		return new Promise((fulfill,reject)=>{
			// 2. 메뉴 테이블에서 메뉴 가져오기
			var query='select distinct menu_idx from menu where store_idx=?';
			connection.query(query,req.params.store_idx,(err,data)=>{
				if(err) reject(err);
				else{
					if(data[0]) fulfill([data,connection]);
					else res.status(500).send({message:"no menu"});
				}
			});
		});
	})
	.catch(err=>{res.status(500).send({message:"getConnectionError "+err});})
	.then(([predata,connection])=>{
		var result=new Array();
		function getdata(i,predata){
			console.log(i);
			return new Promise((fulfill,reject)=>{
				// 3. 하나의 메뉴 객체 가져오기
				var query= 'select * from menu where menu_idx=?';
				connection.query(query,predata[i].menu_idx,(err,data)=>{
					if(err) res.status(500).send({message:err});
					else{
						if(data[0]) result[i]=data[0];
						else res.status(200).send({message:"no data"});
						console.log(result);
						if(i===predata.length-1){
							res.status(200).send({result:result});
						}
					}
				});
				if(i===predata.length-1) connection.release();
				else getdata(i+1,predata);
			});
		}
		getdata(0,predata);
	});
});



module.exports=router;
