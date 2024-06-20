const userDao = require('../dao/userDao');
const bookDao = require('../dao/bookDao');
const boardDao = require('../dao/boardDao');
const hashUtil = require('../lib/hashUtil');
const tokenUtil = require('../lib/tokenUtil');

const boardService = {
  async reg(params) {
    console.log("🚀 ~ reg ~ params:", params)
    let inserted = null;    
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


  async allFind() {
    let inserted = null;    
    try {
      inserted = await boardDao.fineAll();
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },

  async updatePost(params) {
    console.log("🚀 ~ reg ~ allFindparams:")
    let inserted = null;    
    try {
      inserted = await boardDao.editUpdate(params);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },

  async deletePost(params) {
    console.log("🚀 ~ reg ~ allFindparams:")
    let inserted = null;    
    try {
      inserted = await boardDao.editDelete(params);
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },
  
};

module.exports = boardService;
