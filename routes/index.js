var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var weathersRouter = require('./weather');



router.use('/users', usersRouter);
router.use('/weather', weathersRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
