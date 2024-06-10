const jwt = require('jsonwebtoken');

const secretKey = process.env.TOEKN_SECRET || 'fea9e38fe71f3bbdef2122aca5fc17f3';

const options = {

  expiresIn: process.env.TOKEN_EXPIRESIN || '8000h',

};

const tokenUtil = {
  makeToken(user) {
    const payload = {
      id: user.id,

      namme: user.name,
      userid: user.userid,
      role: user.role,

    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
  },
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (err) {
      return null;
    }
  },
};

module.exports = tokenUtil;
