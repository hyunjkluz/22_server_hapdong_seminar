const express = require('express');
const router = express.Router();


// 1. 계정관리 (로그인, 회원가입)
const user=require('./user/index.js');
router.use('/user',user);

// 2. 메인화면 (메인화면, 분류별 가게 리스트)
const main=require('./main/index.js');
router.use('/main',main);

// 3. 가게관리 (가게등록, 가게메뉴 리스트, 가게 정보, 가게리뷰 리스트, 가게 리뷰등록)
const store=require('./store/index.js');
router.use('/store',store);

// // 4. 북마크 (북마크 리스트, 북마크 등록)
const bookmark=require('./bookmark/index.js');
router.use('/bookmark',bookmark);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// 현재 js 파일을 다른 파일에서 사용할 수 있도록 exports
module.exports = router;
