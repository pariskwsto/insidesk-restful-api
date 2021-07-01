const mongoose = require('mongoose');

// REVIEW
const FoodInfoSchema = new mongoose.Schema({
  // item info
  // _id: String,
  datauuid: String,
  name: String,
  description: String,
  // serving info
  default_number_of_serving_unit: String,
  serving_description: String,
  metric_serving_amount: String,
  metric_serving_unit: String,
  // nutritients info
  monosaturated_fat: String,
  cholesterol: String,
  sugar: String,
  vitamin_c: String,
  saturated_fat: String,
  iron: String,
  potassium: String,
  sodium: String,
  vitamin_d: String,
  info_provider: String,
  dietary_fiber: String,
  total_fat: String,
  protein: String,
  carbohydrate: String,
  unit_count_per_calorie: String,
  vitamin_a: String,
  polysaturated_fat: String,
  provider_food_id: String,
  calcium: String,
  trans_fat: String,
  calorie: String,
  added_sugar: String,
  custom: String,
  // device info
  pkg_name: String,
  deviceuuid: String,
  // time info
  //   createdAt: {
  //     type: Date,
  //     default: Date.now,
  //   },
  create_time: String,
  update_time: String,
});

module.exports = mongoose.model('FoodInfo', FoodInfoSchema, 'food_info');
