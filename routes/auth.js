const express = require('express');

const router = express.Router();
const userService = require('../service/userService');

// 로그인
router.post('/login', async (req, res, next) => {
  try {
    console.log('auth/login/post', req.body);

    const params = {
      userID: req.body.userID,
      password: req.body.password,
    };

    if (!params.userID) {
      const err = new Error('Not allowed null (userID)');
      res.status(500).json({ err: err.toString() });
    }

    if (!params.password) {
      const err = new Error('Not allowed null (password)');
      res.status(500).json({ err: err.toString() });
    }

    const result = await userService.login(params);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
