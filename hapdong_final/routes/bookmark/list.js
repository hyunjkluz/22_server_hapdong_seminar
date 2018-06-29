const express = require('express');
const router = express.Router();
const request=require('async');
const db = require('../../module/pool.js');

router.get('/:user_id', async(req, res) => {
    try {
        if(!(req.params.user_id)){
            res.status(403).send({
               message : "no user_id input"
            });
         } else {
            let query = 'select A.store_name,A.store_img,count(R.store_idx) AS reviewCnt from store A, bookmark B LEFT JOIN review R On B.store_idx=R.store_idx where A.store_idx=B.store_idx and B.user_id=? group by A.store_idx;';
            let bookmarks = await db.queryParam_Arr(query, [req.params.user_id]);	

            if (!bookmarks) {												
                res.status(500).send({
                    msg : "No Bookmarks"
                });
            } else {
                res.status(200).send({
                    msg : "Successfully get list",
                    list :  bookmarks
                 });
            }
         }
    } catch (err) {
        console.log(err);
        res.status(500).sen ({
            msg : "syntax err"
        });
    }    
    
});

module.exports = router;
