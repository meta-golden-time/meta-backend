// sequelize와 User 모델 불러오기
const { Op } = require('sequelize');
const { User } = require('../models/index');

// userDao 객체를 정의, 이 객체는 데이터베이스에 대한 CRUD 연산을 수행한다.
const userDao = {
  // 사용자를 삽입하는 함수
  insert(params) {

    return new Promise((resolve, reject) => {
      User.create(params).then((inserted) => {
        const { password, ...newInserted } = JSON.parse(JSON.stringify(inserted));
        resolve(newInserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 사용자 목록을 조회하는 함수 (리스트 조회)
  selectList(params) {

    const setQuery = {};
    if (params.ids) {
      setQuery.where = {
        ...setQuery.where,
        id: params.ids,
      };
    }
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` },
      };
    }
    if (params.userID) {
      setQuery.where = {
        ...setQuery.where,
        userID: { [Op.like]: `%${params.userID}%` },
      };
    }
    if (params.email) {
      setQuery.where = {
        ...setQuery.where,
        email: params.email,
      };
    }
    if (params.phone) {
      setQuery.where = {
        ...setQuery.where,
        phone: params.phone,
      };
    }
    if (params.addrLat) {
      setQuery.where = {
        ...setQuery.where,
        addrLat: params.addrLat,
      };
    }
    if (params.addrLng) {
      setQuery.where = {
        ...setQuery.where,
        addrLng: params.addrLng,
      };
    }

    // 결과를 id 내림차순으로 정렬
    setQuery.order = [['id', 'DESC']];
    if (params.limit) {
      setQuery.limit = params.limit;
    }
    if (params.offset) {
      setQuery.offset = params.offset;
    }

    return new Promise((resolve, reject) => {
      User.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ['password'] }, // 비밀번호는 제외
      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 로그인용 유저 정보 조회
  selectUser(params) {
    return new Promise((resolve, reject) => {
      User.findOne({
        attributes: ['id', 'userID', 'password', 'name'],
        where: [{ userID: params.userID }],
      }).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      User.update(
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
  // 삭제
  delete(params) {

    return new Promise((resolve, reject) => {
      User.destroy({
        where: { id: params.id },
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  deleteForce(params) {
    return new Promise((resolve, reject) => {
      User.destroy({
        where: { id: params.id },
        force: true,
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = userDao;
