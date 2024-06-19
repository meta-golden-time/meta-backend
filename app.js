var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./src/routes/index');

const models = require('./src/models/index');

const bodyParser = require('body-parser');
const { sessionMiddleware } = require('./src/middlewares/user/Login');

var app = express();

const corsOptions = {
  //origin: 'http://localhost:5173', // 요청을 허용할 출처
  //credentials: true, // 자격 증명을 허용
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessionMiddleware); // 세션 미들웨어 적용
app.use('/', indexRouter);

console.log("생성이 되었니??")

models.sequelize.authenticate().then(() => {
  console.log('DB connection Success'); 

  models.sequelize.sync().then(() => {
    console.log('Sequelize sync Success!!!!!!');
  }).catch((error) => {
    console.log(error);
  });
}).catch((error) => {
  console.log(error);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  
  // JSON 형식으로 에러를 반환합니다
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
