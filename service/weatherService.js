const logger = require('../lib/logger');
const postDao = require('../dao/postDao');
const postUserLikeJoinDao = require('../dao/postUserLikeJoinDao');
const postUserHateJoinDao = require('../dao/postUserHateJoinDao');

const postService = {
  async search(params) {
    let result = null;
    try {
      const apiURL = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
      const nowFormat = format(new Date(), 'yyyyMMdd');
      console.log('🚀 ~ router.get ~ nowFormat:', nowFormat);
      
  
      result = await superagent
        .get(apiURL)
        .query({
          ServiceKey: '5AixXeDNsKuyZ6zDiEY2sB5yTjp6RMUt0g+crj1vwJ8JZDDnkJ31fLeOg2rqahoBsyf1meC4oS2UlV4aggcgyg==', // 실제 서비스 키로 변경해야 합니다.
          pageNo: '1',
          numOfRows: '1000',
          dataType: 'JSON',
          base_date: nowFormat,
          base_time: '0500',
          nx: params.gridX,
          ny: params.gridY,
        });
      console.log("🚀 ~ router.get ~ response:", result.ok)
    } catch (err) {
     
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(result);
    });
  }
  
};

module.exports = postService;
