const express = require('express');
const superagent = require('superagent');
const { format } = require('date-fns');

const logger = require('../lib/logger');

const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log('입자잉요 ');
  try {
    const params = {
      gridX: req.query.gridX,
      gridY: req.query.gridY,
    };
    console.log("🚀 ~ router.get ~ params:", params);
    
    const apiURL = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
    const nowFormat = format(new Date(), 'yyyyMMdd');
    console.log('🚀 ~ router.get ~ nowFormat:', nowFormat);
    let result = null;

    const response = await superagent
      .get(apiURL)
      .query({
        ServiceKey: '', // 실제 서비스 키로 변경해야 합니다.
        pageNo: '1',
        numOfRows: '1000',
        dataType: 'JSON',
        base_date: nowFormat,
        base_time: '0500',
        nx: params.gridX,
        ny: params.gridY,
      });
    console.log("🚀 ~ router.get ~ response:", response)

    // 응답이 성공적인지 확인
    if (response.ok) {
      try {
        const textData = JSON.parse(response.text);
        result = textData.response.body.items.item;
        const nowTime = `${format(new Date(), 'HH')}00`;
        result = result.filter((weather) => weather.fcstDate === nowFormat && weather.fcstTime === nowTime);
        res.status(200).json(result);
      } catch (parseError) {
        throw new Error(`JSON 응답을 파싱하는 데 실패했습니다: ${parseError.message}`);
      }
    } else {
      throw new Error(`API 요청이 상태 코드 ${response.status}로 실패했습니다`);
    }
  } catch (err) {
    logger.error(`./router/weather.js.weather: ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
