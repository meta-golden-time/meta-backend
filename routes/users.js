const express = require('express');

const router = express.Router();
const userService = require('../service/userService');
const { isLoggedIn } = require('../lib/middleware');

// 사용자 정보 입력
router.post('/', async (req, res, next) => {
  console.log("🚀 ~ router.post ~ req:", req.body)
  
  try {
    const params = {
      name: req.body.name,
      userID: req.body.userID,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      addrLat: req.body.addrLat,
      addrLng: req.body.addrLng,
    };
    console.log("🚀 ~ router.post ~ params:", params)
   
    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      res.status(500).json({ err: err.toString() });
    }

    if (!params.userID) {
      const err = new Error('Not allowed null (userID)');
      res.status(500).json({ err: err.toString() });
    }

    if (!params.password) {
      const err = new Error('Not allowed null (password)');
      res.status(500).json({ err: err.toString() });
    }

    // if (!params.addrLat) {
    //   const err = new Error('Not allowed null (address Lat)');
    //   res.status(500).json({ err: err.toFolat() });
    // }

    // if (!params.addrLng) {
    //   const err = new Error('Not allowed null (address Lng)');
    //   res.status(500).json({ err: err.toFolat() });
    // }


    const result = await userService.reg(params);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const params = {
      ids: req.query.ids ? req.query.ids.split(',') : null,
      name: req.query.name,
      userID: req.query.userID,
      email: req.query.email,
      phone: req.query.phone,
      addrLat: req.query.addrLat,
      addrLng: req.query.addrLng,
    };

    const result = await userService.list(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 상세정보 조회
router.get('/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };

    const result = await userService.info(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 수정
router.put('/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };

    const result = await userService.edit(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };

    const result = await userService.delete(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});
// 삭제
router.delete('/force/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };

    const result = await userService.deleteForce(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
