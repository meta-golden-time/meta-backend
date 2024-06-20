const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const { deleteAllSessions } = require('../middlewares/user/Login');

router.post('/login', async (req, res, next) => {
  try {
    const { userID, password } = req.body;
    const body = {
      userID,
      password
    };  

    if (!userID || !password) {
      return res.status(400).json({ error: 'Both userID and password are required' });
    } 
    const user = await userService.login(body);

    if (user) {
      req.session.user = user;
      req.session.isLogin = true;
      res.status(200).json({ user, success: true });
    } else {
      res.status(401).json({ error: 'Invalid credentials' } , false);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 세션 체크 엔드포인트
router.get('/loginCheck', (req, res) => {
  if (req.session.isLogin) {
    res.json({ success: true, user: req.session.user });
  } else {
    res.json({ success: false });
  }
});


router.post('/logout',deleteAllSessions, async (req, res, next) => {
  // try {
  //   req.session.destroy(function(err){
  //     res.status(200).send({ success: true });
  //   });
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
});


module.exports = router;
