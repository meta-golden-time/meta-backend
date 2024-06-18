const session = require('express-session');
const FileStore = require('session-file-store')(session);
const isProduction = process.env.NODE_ENV === 'production';

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true,
    secure: isProduction,
    maxAge: 30 * 60 * 1000 // 30분 
  }, 
  store: new FileStore()
},console.log("세션 완료"));

const authMiddleware = (req, res, next) => { 
  
  console.log("🚀 ~ authMiddleware ~ req.session:", req.session)
  if (req.session && req.session.isLogin === true) {
    console.log("로그인성공")
    next();
  } else {
    res.status(401).json({ err: 'Unauthorized' });
  }
}; 

module.exports = {
  sessionMiddleware,
  authMiddleware
};
