const express = require('express');
const router = express.Router();

const foodInfo = require('./foodInfo');

router.use('/food-info', foodInfo);

module.exports = router;
