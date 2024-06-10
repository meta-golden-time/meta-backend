const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const REST_API_KEY = '5f5f311bee7e2ebe56b7fbafb3bb04e1';

router.get('/directions', async (req, res) => {
  const { startLng, startLat, endLng, endLat } = req.query;

  if (!startLng || !startLat || !endLng || !endLat) {
    return res.status(400).json({ error: 'Missing query parameters' });
  }

  const origin = `${startLng},${startLat}`;
  const destination = `${endLng},${endLat}`;

  const headers = {
    'Authorization': `KakaoAK ${REST_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const queryParams = new URLSearchParams();
  queryParams.append('origin', origin);
  queryParams.append('destination', destination);
  

  const requestUrl = `https://apis-navi.kakaomobility.com/v1/directions?${queryParams.toString()}`;

  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;