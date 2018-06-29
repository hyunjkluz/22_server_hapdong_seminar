var express=require('express');
const upload = require('../../config/multer.js');
var router=express.Router();
const request=require('async-request');
const db = require('../../module/pool.js');
// POST 방식, ip:3000/board
router.post('/', upload.array('image'), async (req, res) => {

	let user_id = req.body.user_id;
	let category = req.body.category;
	let name = req.body.name;
	let store_info = req.body.description;
	let image = req.files;
	let photos = "";
	let menu = req.body.menu;
	let menu_info = req.body.price;
	

	if (!category || !name || !image || !menu || !menu_info || !user_id) {			// value가 제대로 들어오지 않았을 경우 에러 메세지 보내준다.
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
		// console.log(photos);
		let registerStoreQuery = 'INSERT INTO store (store_name, store_categories, store_img, user_id, store_info) VALUES (?, ?, ?, ?, ?)';
		// query문에 들어갈 runtime 시에 정해지는 value들을 배열의 형태로 queryParam_Arr 메소드에 넘겨줌
    let registerStore = await db.queryParam_Arr(registerStoreQuery,[name, category, photos, user_id, store_info]);

    let selectStoreIdx = 'SELECT * FROM store WHERE store_categories= ? and store_name = ? and store_info = ? and store_img= ? and user_id =?'

    let store_idx = await db.queryParam_Arr(selectStoreIdx, [category, name, store_info, photos, user_id]);

    let registerMenuQuery = 'INSERT INTO menu (menu_name, menu_info, store_idx) VALUES (?, ?, ?)';

    let registerMenu = await db.queryParam_Arr(registerMenuQuery, [menu, menu_info, store_idx[0].store_idx]);

    //console.log("registerStore\t"+registerStore);
    //console.log("store_idx\t"+store_idx);
		//console.log("registerMenu\t"+registerMenu);
		if (!registerStore || !registerMenu || !store_idx) {
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
