const express = require('express');

const {
  getAllFoodInfo,
  getSingleFoodInfo,
  createFoodInfo,
  updateFoodInfo,
  deleteFoodInfo,
  searchFoodInfoByBarcode,
} = require('../../controllers/foodInfo');

const advancedResults = require('../../middleware/advancedResults');
const FoodInfo = require('../../models/FoodInfo');

const router = express.Router();

// TODO review access

router.route('/barcode/:barcode').get(searchFoodInfoByBarcode);

router
  .route('/')
  .get(advancedResults(FoodInfo), getAllFoodInfo)
  .post(createFoodInfo);

router
  .route('/:id')
  .get(getSingleFoodInfo)
  .put(updateFoodInfo)
  .delete(deleteFoodInfo);

module.exports = router;
