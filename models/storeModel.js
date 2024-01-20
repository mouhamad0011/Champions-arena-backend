const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  item: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  info: { type: String, required: false}
});

const Store = mongoose.model("store", storeSchema);
module.exports = Store;