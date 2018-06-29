var express = require('express');
var router = express.Router();
const request = require('async-request');
var pool = require('../../bin/dbPool');

//category 이름 받기 -> 뿌려주기 
router.get('/:category', async(req, res) => {
   try{
      if(!(req.params.category)){
         res.status(403).send({
            message : "please input category name please"
         });
      }else{
         let connection = await pool.getConnection();

         let getlistQuery = 'SELECT A.store_idx, A.store_name, A.store_img, count(B.store_idx) as review_cnt FROM board.store A Left Join board.review B On A.store_idx = B.store_idx WHERE store_categories = ? group by A.store_idx';
         let myPosts = await connection.query(getlistQuery, req.params.category);

         res.status(200).send({
            "message" : "Successfully get list",
            "myPosts" :  myPosts
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

});
module.exports=router;