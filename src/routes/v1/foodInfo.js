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
const { protect } = require('../../middleware/auth');
const FoodInfo = require('../../models/FoodInfo');

const router = express.Router();

router.route('/barcode/:barcode').get(protect, searchFoodInfoByBarcode);

router
  .route('/')
  .get(protect, advancedResults(FoodInfo), getAllFoodInfo)
  .post(protect, createFoodInfo);

router
  .route('/:id')
  .get(protect, getSingleFoodInfo)
  .put(protect, updateFoodInfo)
  .delete(protect, deleteFoodInfo);

module.exports = router;
