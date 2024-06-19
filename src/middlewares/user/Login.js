const session = require('express-session');
const FileStore = require('session-file-store')(session);
const isProduction = process.env.NODE_ENV === 'production';
const fs = require('fs');
const path = require('path');

const sessionStorePath = './sessions'; // 세션 파일이 저장되는 디렉토리
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    maxAge: 60 * 60 * 1000 // 60분
  },
  store: new FileStore({ 
    path: sessionStorePath, 
    retries: 1,
    ttl: 60 * 60, // 세션 유효 기간을 초 단위로 설정 (30분)
    reapInterval: 70 * 60 // 주기적으로 만료된 세션을 삭제 (1시간 간격)
  })
});

const authMiddleware = (req, res, next) => { 
  console.log("req.session0req.session",req.session)
  if (req.session && req.session.isLogin === true) {
    console.log("로그인성공")
    next();
  } else {
    console.log("로그인실패")
    res.status(401).json({ err: 'Unauthorized' });
  }
}; 

// 모든 세션 삭제
const deleteAllSessions = (req, res, next) => {
  fs.readdir(sessionStorePath, (err, files) => {
    if (err) return next(err);

    files.forEach(file => {
      fs.unlink(path.join(sessionStorePath, file), (err) => {
        if (err) return next(err);
      });
    });

    res.status(200).json({ success: true });
  });
};

module.exports = {
  sessionMiddleware,
  authMiddleware,
  deleteAllSessions
};
