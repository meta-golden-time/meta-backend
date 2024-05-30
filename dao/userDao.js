// sequelize와 User 모델 불러오기
const { Op } = require('sequelize');
const { User } = require('../models/index');

// userDao 객체를 정의, 이 객체는 데이터베이스에 대한 CRUD 연산을 수행한다.
const userDao = {
  // 사용자를 삽입하는 함수
  insert(params) {
    // Promise 객체를 반환합니다. 비동기 처리를 위해 사용됩니다.
    return new Promise((resolve, reject) => {
      // User 모델을 사용하여 새 사용자를 생성합니다. params는 새 사용자 정보를 담고 있습니다.
      User.create(params).then((inserted) => {
        // console.log(JSON.parse(JSON.stringify(inserted))); // 불필요한 정보를 제외해서 보여준다.
        // 삽입된 사용자 정보에서 비밀번호를 제외하고 나머지 정보만을 추출합니다.
        const { password, ...newInserted } = JSON.parse(JSON.stringify(inserted));
        // 처리가 성공했을 때, 비밀번호를 제외한 사용자 정보를 반환합니다.
        resolve(newInserted);
      }).catch((err) => {
        // 처리 중 에러가 발생하면 에러를 반환합니다.
        reject(err);
      });
    });
  },
  // 사용자 목록을 조회하는 함수 (리스트 조회)
  selectList(params) {
    // 검색 조건을 설정합니다.
    const setQuery = {};
    if (params.ids) {
      // ids 배열을 통해 여러 사용자를 조회할 수 있습니다. 예) [1,2,3,4]
      setQuery.where = {
        ...setQuery.where,
        id: params.ids,
      };
    }
    if (params.name) {
      // 이름을 기준으로 유사 검색을 수행합니다.
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` },
      };
    }
    if (params.userID) {
      // userID를 기준으로 유사 검색을 수행합니다.
      setQuery.where = {
        ...setQuery.where,
        userID: { [Op.like]: `%${params.userID}%` },
      };
    }
    if (params.email) {
      // 이메일을 기준으로 정확한 검색을 수행합니다.
      setQuery.where = {
        ...setQuery.where,
        email: params.email,
      };
    }
    if (params.phone) {
      // 전화번호를 기준으로 정확한 검색을 수행합니다.
      setQuery.where = {
        ...setQuery.where,
        phone: params.phone,
      };
    }
    if (params.addrLat) {
      // 주소의 위도를 기준으로 정확한 검색을 수행합니다.
      setQuery.where = {
        ...setQuery.where,
        addrLat: params.addrLat,
      };
    }
    if (params.addrLng) {
      // 주소의 경도를 기준으로 정확한 검색을 수행합니다.
      setQuery.where = {
        ...setQuery.where,
        addrLng: params.addrLng,
      };
    }

    // 결과를 id 내림차순으로 정렬합니다.
    setQuery.order = [['id', 'DESC']];
    // limit와 offset을 설정하여 페이징 처리를 구현할 수 있습니다.
    if (params.limit) {
      setQuery.limit = params.limit;
    }
    if (params.offset) {
      setQuery.offset = params.offset;
    }

    // Promise 객체를 반환합니다. 비동기 처리를 위해 사용됩니다.
    return new Promise((resolve, reject) => {
      // User 모델을 사용하여 조건에 맞는 사용자 목록과 총 개수를 조회합니다.
      // 비밀번호를 제외한 모든 속성과 관련 Department 정보를 포함합니다.
      User.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ['password'] }, // 비밀번호는 제외
      }).then((selectedList) => {
        // 조회 성공 시, 사용자 목록을 반환합니다.
        resolve(selectedList);
      }).catch((err) => {
        // 처리 중 에러가 발생하면 에러를 반환합니다.
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
