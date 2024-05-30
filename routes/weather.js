const express = require('express');
const superagent = require('superagent');
const { format } = require('date-fns');

const logger = require('../lib/logger');
const weatherService = require('../service/weatherService');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const query = {
      gridX: req.query.gridX,
      gridY: req.query.gridY,
    };
    console.log("🚀 ~ router.get ~ params:", query);

    const wResponse = await weatherService.search(query);      

    // 응답이 성공적인지 확인
    if (wResponse.ok) {
      try {
      
        const textData = JSON.parse(wResponse.text);    
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
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
