const express = require('express');
const router = express.Router();

/* GET comments listing. */
router.get('/', function(req, res) {
  res.json([{text: 'I agree'}]);
});

module.exports = router;
