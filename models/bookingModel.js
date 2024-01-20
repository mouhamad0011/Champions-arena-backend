const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: false },
  terrainId: { type: mongoose.Schema.Types.ObjectId, ref: "terrains" },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: false },
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true },
  bill: { type: Number, required: true }
});

const Bookings = mongoose.model("bookings", bookingSchema);
module.exports = Bookings;