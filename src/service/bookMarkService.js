const userDao = require('../dao/userDao');
const bookDao = require('../dao/bookDao');
const boardDao = require('../dao/boardDao');
const hashUtil = require('../lib/hashUtil');
const tokenUtil = require('../lib/tokenUtil');


const bookMarkService = {
  async reg(params) {
    console.log("🚀 ~ reg ~ params:", params)
    let inserted = null;
    let hashPassword = null;
    
    try {
      inserted = await boardDao.insert(params);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },

  async bookAdd(params) {
    console.log("🚀 ~ reg ~ params:", params)
    let inserted = null;
    
    try {
      const existingBookmark = await bookDao.findExistingBookmark(params);
      if (existingBookmark) {
        return new Promise((resolve, reject) => {
          reject(new Error('이미 존재하는 출발지와 도착지 조합입니다.'));
        });
      }
      inserted = await bookDao.insert(params);
      console.log("🚀 ~ bookAdd ~ inserted:", inserted)
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },



  // selectList
  async list(params) {
    let result = null;

    try {
      result = await boardDao.selectList(params);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // selectInfo
  async info(params) {
    let result = null;

    try {
      result = await boardDao.selectInfo(params);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // update
  async edit(params) {
    let result = null;

    try {
      result = await boardDao.update(params);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // delelte
  async delete(params) {
    let result = null;

    try {
      result = await boardDao.delete(params);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  async deleteForce(params) {
    let result = null;

    try {
      result = await boardDao.deleteForce(params);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  async login(params) {
    let tokenResult = null;
    let selectedUserInfo = null;
    try {
      // 1. 사용자 조회 (로그인용)
      selectedUserInfo = await boardDao.selectUser(params);
      console.log('selectedUserInfoselectedUserInfo', selectedUserInfo);
      // 1-1. 사용자 조회된게 있는지 확인후 없으면 에러처리 및 함수 종료
      if (!selectedUserInfo) {
        const err = new Error(`userService.login, 일치하는 유저정보가 없습니다 (userID: ${JSON.stringify(params.userID)})`);
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
      return new Promise((resolve, reject) => {
        resolve(selectedUserInfo);
      });
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    

    
  },
  async search(params) {
    console.log("🚀 ~ reg ~ params:", params)
    let bookMark = null;
    let hashPassword = null;
    
    try {
      bookMark = await bookDao.searchDao(params);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(bookMark);
    });
  },
};

module.exports = bookMarkService;

  



