// sequelize와 User 모델 불러오기
const { Op } = require('sequelize');
const { BookMark } = require('../models/index');

// userDao 객체를 정의, 이 객체는 데이터베이스에 대한 CRUD 연산을 수행한다.
const bookDao = {

  async findExistingBookmark(params) {
    return BookMark.findOne({
      where: {
        userID: params.userID,
        location_S: params.location_S,
        lat_S: params.lat_S,
        lag_S: params.lag_S,
        location_E: params.location_E,
        lat_E: params.lat_E,
        lag_E: params.lag_E
      }
    });
  },

  
  // 사용자를 삽입하는 함수
  insert(params) {
    console.log("🚀 ~ insert ~ params:", params)
    // Promise 객체를 반환합니다. 비동기 처리를 위해 사용됩니다.
    return new Promise((resolve, reject) => {
      // User 모델을 사용하여 새 사용자를 생성합니다. params는 새 사용자 정보를 담고 있습니다.
      BookMark.create(params).then((inserted) => {
        console.log("🚀 ~ User.create ~ inserted:", inserted)
        // console.log(JSON.parse(JSON.stringify(inserted))); // 불필요한 정보를 제외해서 보여준다.
        resolve(inserted);
      }).catch((err) => {
        console.log("🚀 ~ BookMark.create ~ err:", err)
     
        // 처리 중 에러가 발생하면 에러를 반환합니다.
        reject(err);
      });
    });
  },

  ///즐겨찾기 검색
  searchDao(params) {
    return new Promise((resolve, reject) => {
      BookMark.findAll({
        where: [{ user_i_d: params.userID }],
      }).then((selectedInfo) => {       
        resolve(selectedInfo);
      }).catch((err) => {
      
        reject(err);
      });
    });
  }
  
};
module.exports = bookDao;
