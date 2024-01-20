const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  terrainId: { type: mongoose.Schema.Types.ObjectId, ref: "terrains" },
  price: { type: Number, required: true },
  image: { type: String, required: true }, 
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const Events = mongoose.model("events", eventSchema);
module.exports = Events;