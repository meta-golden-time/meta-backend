var express = require('express');
var router = express.Router();

const userRouter = require('./users');
const authRouter = require('./auth');

router.use('/users', userRouter);
router.use('/auth', authRouter);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
