var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var weathersRouter = require('./weather');

<<<<<<< Updated upstream

=======
const userRouter = require('./user');
const loginRouter = require('./auth');

router.use('/users', userRouter);
router.use('/auth', loginRouter);
>>>>>>> Stashed changes

router.use('/users', usersRouter);
router.use('/weather', weathersRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
