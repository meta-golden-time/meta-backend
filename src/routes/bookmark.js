const express = require('express');
const router = express.Router();
const bookMarkService = require('../service/bookMarkService');
const { authMiddleware } = require('../middlewares/user/Login');

// 북마크 추가
router.post('/add', authMiddleware, async (req, res, next) => {
  console.log("🚀 ~ router.post ~  req.body:",  req.body)
  const user = req.session.user;    
  
  if (!user) {
    return res.status(401).json({ err: 'Unauthorized user' });
  }

  const params = {
    userID: user.userID,
    location_S: req.body.location_S,
    lat_S: req.body.lat_S,
    lag_S: req.body.lag_S,
    location_E: req.body.location_E,
    lat_E: req.body.lat_E,
    lag_E: req.body.lag_E,
  };

  try {
    if (!params.location_S || !params.lat_S || !params.lag_S || !params.location_E || !params.lat_E || !params.lag_E) {
      return res.status(400).json({ err: 'All fields are required' });
    }

    
  
    const result = await bookMarkService.bookAdd(params);
    console.log("🚀 ~ router.post ~ result:", result)
    res.status(200).json(result);
  } catch (err) {
    if (err.message === '이미 존재하는 출발지와 도착지 조합입니다.') {
      res.status(400).json({ err: err.message });
    } else {
      res.status(500).json({ err: err.toString() });
    }
  }
});


// 북마크 갸져오기
router.get('/list', authMiddleware, async (req, res, next) => {
  console.log("🚀 ~ router.post ~  req.body:",  req.body)
  const user = req.session.user;    
  
  if (!user) {
    return res.status(401).json({ err: 'Unauthorized user' });
  }

  const params = {
    userID: user.userID
  };

  try {  
    const result = await bookMarkService.search(params);
    console.log("🚀 ~ router.post ~ result:", result)
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
