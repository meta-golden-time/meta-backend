const { sequelize } = require('./connection');

const User = require('./user');

const db = {};

db.sequelize = sequelize;

// models 에서 설정한 DB 코드 파일 연결
db.User = User;


Object.keys(db).forEach((modelName) => {
    if (db[modelName].init) {
      db[modelName].init(sequelize);
    }
  });

  setTimeout(() => { // 특정 시간이 지나면 관계설정하기 (like가 조회 되지 않는 방법 우회 방법)
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
  }, 1000);
  
  module.exports = db;
  