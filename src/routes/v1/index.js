const express = require('express');
const router = express.Router();

const auth = require('./auth');
const foodInfo = require('./foodInfo');

router.use('/auth', auth);
router.use('/food-info', foodInfo);

module.exports = router;
