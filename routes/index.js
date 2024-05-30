var express = require('express');
var router = express.Router();

const userRouter = require('./user');

router.use('/users', userRouter);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
