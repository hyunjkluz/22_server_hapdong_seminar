var express=require('express');
const upload = require('../../config/multer.js');
var router=express.Router();
const request=require('async-request');
const db = require('../../module/pool.js');
let moment = require('moment');

// POST 방식, ip:3000/board
router.post('/', upload.array('image'), async (req, res) => {

	let user_id = req.body.id;
	let store_idx = req.body.store_idx;
	let content = req.body.content;
	let image = req.files;
	let photos = "";
	

	if (!user_id || !store_idx || !content) {			// value가 제대로 들어오지 않았을 경우 에러 메세지 보내준다.
		res.status(400).send({
			message : "Null Value"
		});
	} else {

		let filesLength = image.length;
		
		for(var i=0; i< filesLength; i++){
			photos+= image[i].location;

			if(i != filesLength-1){
				photos += ",";
			}
		}
		//console.log(photos);
		let registerReviewQuery = 'INSERT INTO review (store_idx, user_id, review_content, review_writetime, review_img) VALUES (?, ?, ?, ?, ?)';
		// query문에 들어갈 runtime 시에 정해지는 value들을 배열의 형태로 queryParam_Arr 메소드에 넘겨줌
    let registerReview = await db.queryParam_Arr(registerReviewQuery, [store_idx, user_id, content,moment().format("YYYY-MM-DD HH:mm:ss"), photos]);

		if (!registerReview) {
			res.status(500).send({
				message : "Internal Server Error"
			});
		} else {
			res.status(201).send({
				message : "Successful Register Board Data",
			});
		}	
	}
});
/*router.post('/', upload.array('image'), function(req, res) { //여러개 업로드
	console.log(req.files);
	res.status(201).send({
		message : "Successfully Store files"
	});
});

router.post('/fields', upload.fields([{name : 'test', maxCount : 1}, {name : 'test2', maxCount : 2}]), function(req, res) {
  console.log(req.files);
  res.status(201).send({
    message : "Successfully Store files"
  });
});
*/
module.exports=router;
