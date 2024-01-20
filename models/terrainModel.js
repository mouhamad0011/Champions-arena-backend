const mongoose = require("mongoose");

const terrainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sport : { type: String, required: true, enum : ["football", "basketball", "volleyball", "tennis"]},
  available: { type: Boolean, required: true,},
  hourPrice: { type: Number, required: true },
  image: { type: String, required: true },
  dimensions : { type: String, required: true}
});

const Terrains = mongoose.model("terrains", terrainSchema);
module.exports = Terrains;