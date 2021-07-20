const axios = require('axios');
const asyncHandler = require('../middleware/asyncHandler');
const FoodInfo = require('../models/FoodInfo');
const ErrorResponse = require('../utils/errorResponse');

const { OPEN_FOOD_FACTS_BASE_URL } = process.env;

/**
 * @desc    Get all food info
 * @route   GET /v1/food-info
 * @access  Private
 */
exports.getAllFoodInfo = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @desc    Get single food info
 * @route   GET /v1/food-info/:id
 * @access  Private
 */
exports.getSingleFoodInfo = asyncHandler(async (req, res, next) => {
  const foodInfo = await FoodInfo.findById(req.params.id);

  if (!foodInfo) {
    return next(
      new ErrorResponse(`Food not found with id of ${req.params.id}`, 404)
    );
  }

  // make sure user is food owner
  if (foodInfo.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to get this food information`,
        401
      )
    );
  }

  res.status(200).json({ success: true, data: foodInfo });
});

// @desc      Create new food info
// @route     POST /v1/food-info
// @access    Private
exports.createFoodInfo = asyncHandler(async (req, res, next) => {
  // add user to req,body
  req.body.user = req.user.id;

  const foodInfo = await FoodInfo.create(req.body);

  res.status(201).json({
    success: true,
    data: foodInfo,
  });
});

// @desc    Update food info
// @route   PUT /v1/food-info/:id
// @access  Private
exports.updateFoodInfo = asyncHandler(async (req, res, next) => {
  let foodInfo = await FoodInfo.findById(req.params.id);

  if (!foodInfo) {
    return next(
      new ErrorResponse(`Food not found with id of ${req.params.id}`, 404)
    );
  }

  // make sure user is food owner
  if (foodInfo.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this food information`,
        401
      )
    );
  }

  foodInfo = await FoodInfo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: foodInfo });
});

// @desc    Delete food info
// @route   DELETE /v1/food-info/:id
// @access  Private
exports.deleteFoodInfo = asyncHandler(async (req, res, next) => {
  const foodInfo = await FoodInfo.findById(req.params.id);

  if (!foodInfo) {
    return next(
      new ErrorResponse(`Food not found with id of ${req.params.id}`, 404)
    );
  }

  // make sure user is food owner
  if (foodInfo.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this food information`,
        401
      )
    );
  }

  await foodInfo.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Get food info by barcode (Open Food Facts - World)
// @route   GET /v1/food-info/barcode/:barcode
// @access  Private
exports.searchFoodInfoByBarcode = asyncHandler(async (req, res, next) => {
  const barcode = req.params.barcode;
  const url = `${OPEN_FOOD_FACTS_BASE_URL}/${barcode}.json`;

  const foodInfo = await axios.get(url).then(
    (res) => {
      // console.log(res);
      const { product, code } = res.data;
      const { product_name, nutriments } = product;

      return { product_name, code, nutriments };
    },
    (err) => {
      // console.log(err);
      return err;
    }
  );

  if (!foodInfo) {
    return next(
      new ErrorResponse(`Food not found with barcode ${barcode}`, 404)
    );
  }

  res.status(200).json({ success: true, data: foodInfo });
});
