const userDao = require('../dao/userDao');
const bookDao = require('../dao/bookDao');
const hashUtil = require('../lib/hashUtil');
const tokenUtil = require('../lib/tokenUtil');

const userService = {
  
  async login(params) {   
    let tokenResult = null;
    let selectedUserInfo = null;
    try {
      // 1. 사용자 조회 (로그인용)
      selectedUserInfo = await userDao.loginUser(params);
     
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

  async idCheck(params) {
   
    let tokenResult = null;
    let selectedUserInfo = null;
    try {
      // 1. 사용자 조회 (로그인용)
      selectedUserInfo = await userDao.selectUser(params);
      console.log("🚀 ~ idCheck ~ selectedUserInfo:", selectedUserInfo)
      return new Promise((resolve, reject) => {
        resolve(selectedUserInfo);
      });
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    

    
  },
};

module.exports = userService;
