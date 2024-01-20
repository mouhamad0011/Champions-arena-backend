const express = require("express");
const router = express.Router();
const {
  addBookingByUser,
  addBookingByAdmin,
  findOne,
  getAll,
  deleteBooking,
  updateBooking,
  getBookingsByDate,
  getBookingsByDateAndTime,
  getBookingsByUserId,
  getBookingsByDateAndTerrain
} = require("../controllers/bookingController");

router.get("/getAll", getAll);
router.get("/getById/:Id", findOne);
router.get("/getByUserId/:Id", getBookingsByUserId);
router.post("/addByAdmin", addBookingByAdmin);
router.post("/getByDate", getBookingsByDate);
router.post("/getByDateAndTerrain", getBookingsByDateAndTerrain);

router.post("/getByDateAndTime", getBookingsByDateAndTime);
router.post("/addByUser", addBookingByUser);
router.delete("/delete/:Id", deleteBooking);
router.put("/update/:Id", updateBooking);

module.exports = router;
