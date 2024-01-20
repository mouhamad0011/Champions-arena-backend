const mongoose = require("mongoose");

const cafeteriaSchema = new mongoose.Schema({
  item: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

const Cafeteria = mongoose.model("cafeteria", cafeteriaSchema);
module.exports = Cafeteria;