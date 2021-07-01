const asyncHandler = require('../middleware/asyncHandler');
const FoodInfo = require('../models/FoodInfo');

// @desc      Get all food info
// @route     GET /v1/food-info
// @access    Public
exports.getAllFoodInfo = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single food info
// @route   GET /v1/food-info/:id
// @access  Public
exports.getSingleFoodInfo = asyncHandler(async (req, res, next) => {
  const foodInfo = await FoodInfo.findById(req.params.id);

  if (!foodInfo) {
    return next(
      new ErrorResponse(`Food not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: foodInfo });
});

// @desc    Create new food info
// @route   POST /v1/food-info
// @access  Public
exports.createFoodInfo = asyncHandler(async (req, res, next) => {
  const foodInfo = await FoodInfo.create(req.body);

  res.status(201).json({
    success: true,
    data: foodInfo,
  });
});
