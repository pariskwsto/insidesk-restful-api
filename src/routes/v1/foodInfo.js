const express = require('express');

const {
  getAllFoodInfo,
  getSingleFoodInfo,
  createFoodInfo,
} = require('../../controllers/foodInfo');

const advancedResults = require('../../middleware/advancedResults');
const FoodInfo = require('../../models/FoodInfo');

const router = express.Router();

// TODO review access

router
  .route('/')
  .get(advancedResults(FoodInfo), getAllFoodInfo)
  .post(createFoodInfo);

router.route('/:id').get(getSingleFoodInfo);

module.exports = router;
