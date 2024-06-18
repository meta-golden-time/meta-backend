const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const { authMiddleware } = require('../middlewares/user/Login');
const axios = require('axios');

//navernews불러오기
router.get('/naver', /*authMiddleware,*/ async (req, res, next) => {
    console.log("네이버뉴스 겟으로 들어왔어요")
    console.log("🚀 ~ router.get ~ req.query:", req.query)
    
  const query = req.query.query || 'latest news';
  console.log("🚀 ~ router.get ~ query:", query)
  const url = `https://openapi.naver.com/v1/search/news.json?query=${query}`;
  const headers = {
      'X-Naver-Client-Id': 'hocsbGo_VMFE8dCIgvoF',
      'X-Naver-Client-Secret': 'KoLNbQs04S'   
  };

  try {
      const response = await axios.get(url, { headers });
      res.status(200).json(response.data);
  } catch (error) {
      res.status(500).send(error.toString());
  }
});

module.exports = router;
