const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

router.post('/login', async (req, res, next) => {
  try {
    console.log("🚀 ~ router.post ~ req.body:", req.body)
    const { userID, password } = req.body;

    if (!userID || !password) {
      return res.status(400).json({ error: 'Both userID and password are required' });
    }
 
    const user = await userService.login({ userID, password });

    if (user) {
      req.session.user = { userID, name: user.name, email: user.email, role: user.role };
      req.session.isLogin = true;
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    req.session.destroy(function(err){
      res.status(200).send({ success: true });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
