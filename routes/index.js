var express = require('express');
var router = express.Router();

const userRouter = require('./users');
const loginRouter = require('./auth');
const weatherRouter = require('./weather');
const mapsRouter = require('./maps');

router.use('/users', userRouter);
router.use('/auth', loginRouter);
router.use('/weather', weatherRouter);
router.use('/map', mapsRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
