const userDao = require('../dao/userDao');
const bookDao = require('../dao/bookDao');
const boardDao = require('../dao/boardDao');
const hashUtil = require('../lib/hashUtil');
const tokenUtil = require('../lib/tokenUtil');

const bookMarkService = {
  
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
