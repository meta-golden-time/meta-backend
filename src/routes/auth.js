const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const { deleteAllSessions } = require('../middlewares/user/Login');

router.post('/login', async (req, res, next) => {
  try {
    const { userID, password } = req.body;

    if (!userID || !password) {
      return res.status(400).json({ error: 'Both userID and password are required' });
    }

    const user = await userService.login({ userID, password });

    if (user) {
      req.session.user = { userID, name: user.name, email: user.email, role: user.role };
      req.session.isLogin = true;
      console.log("🚀 ~ router.post ~  req.session:",  req.session)
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
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
