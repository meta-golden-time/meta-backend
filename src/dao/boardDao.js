// sequelize와 User 모델 불러오기
const { Op } = require('sequelize');
const { Board } = require('../models/index');


// boardDao 객체를 정의, 이 객체는 데이터베이스에 대한 CRUD 연산을 수행한다.

const boardDao = {
  // 사용자를 삽입하는 함수
  insert(params) {
    console.log("🚀 ~ insert ~ params:", params)
    // Promise 객체를 반환합니다. 비동기 처리를 위해 사용됩니다.
    return new Promise((resolve, reject) => {
      // User 모델을 사용하여 새 사용자를 생성합니다. params는 새 사용자 정보를 담고 있습니다.
      Board.create(params).then((inserted) => {

        console.log("🚀 ~ Board.create ~ inserted:", inserted)

        // console.log(JSON.parse(JSON.stringify(inserted))); // 불필요한 정보를 제외해서 보여준다.
        // 삽입된 사용자 정보에서 비밀번호를 제외하고 나머지 정보만을 추출합니다.
        //const { password, ...newInserted } = JSON.parse(JSON.stringify(inserted));
        // 처리가 성공했을 때, 비밀번호를 제외한 사용자 정보를 반환합니다.
        resolve(inserted);
      }).catch((err) => {
        // 처리 중 에러가 발생하면 에러를 반환합니다.
        reject(err);
      });
    });
  }, 

  fineAll() {
    // Promise 객체를 반환합니다. 비동기 처리를 위해 사용됩니다.
    return new Promise((resolve, reject) => {
      Board.findAll().then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  }, 

  editUpdate(params) {
    return new Promise((resolve, reject) => {
      Board.update(
        params,
        {
          where: { id: params.id },
        },
      ).then(([updated]) => {
        resolve({ updatedCount: updated });
      }).catch((err) => {
        reject(err);
      });
    });
  }, 

  editDelete(params) {
    return new Promise((resolve, reject) => {
      // Find the record to ensure it exists and to check the password
      Board.findOne({
        where: { id: params.id, userID: params.userID }
      }).then(post => {
        if (!post) {
          reject(new Error('Post not found'));
        } else if (post.password !== params.password) {
          reject(new Error('Invalid password'));
        } else {
          // Perform soft delete
          Board.destroy({
            where: { id: params.id, userID: params.userID },
            force: true // Use force option based on params
          }).then(() => {
            resolve({ success: true, message: 'Post deleted successfully' });
          }).catch((err) => {
            reject(err);
          });
        }
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = boardDao;
