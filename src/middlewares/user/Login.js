// middleware/auth.js
const session = require('express-session');

const isProduction = process.env.NODE_ENV === 'production';

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET_KEY, // 비밀 키는 환경 변수로 설정하는 것이 좋습니다.
  resave: false,
  saveUninitialized: true,
  /*
  saveUninitialized: true: 세션이 초기화되지 않았더라도 무조건 저장합니다. (기본값)
saveUninitialized: false: 초기화되지 않은 세션은 저장하지 않습니다.
  */
  cookie: { 
    secure: isProduction,// HTTPS를 사용하는 경우 true로 설정
    maxAge: 30 * 60 * 1000 // 30분 
  } 
});

const authMiddleware = (req, res, next) => { 
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ err: 'Unauthorized' });
  }
};

module.exports = {
  sessionMiddleware,
  authMiddleware
};
