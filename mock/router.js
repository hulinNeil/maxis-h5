const express = require('express');
const router = express.Router();

router.post('/web/reset', (req, res) => {
  setTimeout(() => {
    res.json({ code: 200, message: '' });
  }, 1000);
});

router.post('/web/forgot', (req, res) => {
  setTimeout(() => {
    res.json({ code: 200, message: '' });
  }, 1000);
});

router.post('/web/verify', (req, res) => {
  setTimeout(() => {
    res.json({ code: 200, message: '', data: 1 });
  }, 1000);
});
module.exports = router;
