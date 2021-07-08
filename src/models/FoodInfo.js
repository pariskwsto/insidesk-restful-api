const mongoose = require('mongoose');

// REVIEW
const FoodInfoSchema = new mongoose.Schema({
  // main info
  // _id: String, // "60d8bb52b79cce0097747778"
  datauuid: String, // "D974914F-F6EE-4781-8EDC-5FFFF7CB6CFC"
  name: String, // "my new food"
  description: String, // null
  // serving
  default_number_of_serving_unit: String, // "1"
  unit_count_per_calorie: String, // "0.000000"
  serving_description: String, // null
  metric_serving_amount: String, // "1"
  metric_serving_unit: String, // "kcal"
  // nutritients
  calorie: String, // "150.000000"
  carbohydrate: String, // "10.000000"
  total_fat: String, // "20.000000"
  protein: String, // "30.000000"
  saturated_fat: String, // "40.000000"
  trans_fat: String, // "50.000000"
  cholesterol: String, // "60.000000"
  sodium: String, // "70.000000"
  potassium: String, // "80.000000"
  dietary_fiber: String, // "90.000000"
  sugar: String, // "100.000000"
  vitamin_a: String, // "110.000000"
  vitamin_c: String, // "120.000000"
  calcium: String, // "130.000000"
  iron: String, // "140.000000"
  monosaturated_fat: String, // "0.000000"
  polysaturated_fat: String, // "0.000000"
  vitamin_d: String, // null
  added_sugar: String, // null
  // other info
  custom: String, // null,
  info_provider: String, // Per 483 g
  provider_food_id: String, // "quickinput-7E7E4589-1FF1-4728-8C28-0A25C181BBD7",
  pkg_name: String, // "com.sec.android.app.shealth"
  deviceuuid: String, // "3S6vHVXCSa"
  // time info
  create_time: String, // "02/07/2021, 00:06:35"
  update_time: String, // "02/07/2021, 00:06:35"
});

module.exports = mongoose.model('FoodInfo', FoodInfoSchema, 'food_info');
