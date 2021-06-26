const express = require('express');
const { version } = require('../../package.json');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

const connectDB = require('../config/db');

const getServerStatus = asyncHandler(async (req, res, next) => {
  const server = { version };
  const db = connectDB.getStatus();

  res.status(200).json({ success: true, data: { server, db } });
});

router.route('/').get(getServerStatus);

module.exports = router;
