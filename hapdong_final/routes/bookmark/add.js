const express=require('express');
const router=express.Router();
const request=require('async-request');
const pool=require('../../bin/dbPool.js')

// const aws = require('aws-sdk');
// aws.config.loadFromPath('../../config/aws_config.json')

//가게 인덱스 받아서 저장 
router.post('/', async (req, res) => {
   try{
      if(!(req.body.user_id && req.body.store_idx)){
         res.status(403).send({
            "message" : "input user_id and store_idx"
         });

      }else{
         var connection = await pool.getConnection();

         let bookmarkadd_query =  'INSERT INTO bookmark(user_id, store_idx) VALUES(?, ?)';
         

        // let params = [req.body.user_id, req.body.store_idx];
         var myPosts = await connection.query(bookmarkadd_query, [req.body.user_id, req.body.store_idx]);

         res.status(200).send({
             "message" : "insert bookmark succeed",
             "myPosts" : myPosts
         });
      }
   }catch(err){
    console.log(err);
      res.status(500).send({
         "message" : "syntax error"
      });
   }finally{
      pool.releaseConnection(connection);
   }
})

module.exports = router;