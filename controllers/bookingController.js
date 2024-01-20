const Bookings = require("../models/bookingModel");

const addBookingByUser = async (req, res) => {
  const { userId, terrainId, date, time, duration, bill } = req.body;
  try {
    if (!userId || !terrainId || !date || !time || !duration || !bill)
      throw Error("All fields must be filled!");
    const newBooking = await Bookings.create({
      userId,
      terrainId,
      date,
      time,
      duration,
      bill,
    });
    res.status(200).json({ message: "Booking added successfully", newBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add the Booking", error: error.message });
  }
};

const addBookingByAdmin = async (req, res) => {
  const { terrainId, firstName, lastName, email, date, time, duration, bill } =
    req.body;
  try {
    if (
      !terrainId ||
      !firstName ||
      !lastName ||
      !email ||
      !date ||
      !time ||
      !duration ||
      !bill
    )
      throw Error("All fields must be filled!");
    const newBooking = await Bookings.create({
      terrainId,
      firstName,
      lastName,
      email,
      date,
      time,
      duration,
      bill,
    });
    res.status(200).json({ message: "Booking added successfully", newBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add the Booking", error: error.message });
  }
};

const findOne = async (req, res) => {
  const { Id } = req.params;
  try {
    if (!Id) throw Error("No id detected to continue");
    const booking = await Bookings.findById({ _id: Id });
    if (!booking) throw Error("An error occured");
    res
      .status(200)
      .json({ message: "Booking retrieved successfully", booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to get booking", error: error.message });
  }
};

const getAll = async (_, res) => {
  try {
    const bookings = await Bookings.find({})
      .populate({
        path: "terrainId",
        model: "terrains",
        select: "name hourPrice",
      })
      .populate({
        path: "userId",
        model: "users",
        select: "firstName lastName email",
      });
    res
      .status(200)
      .json({ message: "Bookings retrieved successfully", bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Couldn't get all bookings", error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  const { Id } = req.params;
  try {
    if (!Id) throw Error("No id passed as parameter");
    const resultat = await Bookings.findByIdAndDelete({ _id: Id });
    if (!resultat) throw Error("An error occured");
    const bookings = await Bookings.find({});
    res.status(200).json({ message: "Booking deleted successfully", bookings });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while deleting booking",
      error: error.message,
    });
  }
};

const updateBooking = async (req, res) => {
  const {
    userId,
    terrainId,
    firstName,
    lastName,
    email,
    date,
    time,
    duration,
    bill,
  } = req.body;
  const { Id } = req.params;
  try {
    if (!Id) throw Error("No id sent as parameter");
    const resultat = await Bookings.findByIdAndUpdate(
      { _id: Id },
      {
        userId,
        terrainId,
        firstName,
        lastName,
        email,
        date,
        time,
        duration,
        bill,
      }
    );
    if (!resultat) throw Error("Error while updating");
    const newBooking = await getBookingById(Id);
    res
      .status(200)
      .json({ message: "Booking updated successfully", newBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update booking", error: error.message });
  }
};

const getBookingsByDate = async (req, res) => {
  const { date } = req.body;
  try {
    const bookings = await Bookings.find({ date });
    res
      .status(200)
      .json({ message: "Bookings retrieved successfully", bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Couldn't get all bookings", error: error.message });
  }
};

const getBookingsByDateAndTime = async (req, res) => {
  const { terrainId, date, time } = req.body;
  try {
    const bookings = await Bookings.find({ terrainId, date, time });
    res
      .status(200)
      .json({ message: "Bookings retrieved successfully", bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Couldn't get all bookings", error: error.message });
  }
};

const getBookingsByUserId = async (req, res) => {
  try {
    const bookings = await Bookings.find({ userId: req.params.Id }).populate({
      path: "terrainId",
      model: "terrains",
      select: "name",
    });
    res
      .status(200)
      .json({ message: "Bookings retrieved successfully", bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Couldn't get all bookings", error: error.message });
  }
};

const getBookingsByDateAndTerrain = async (req, res) => {
  const { date, terrainId } = req.body;
  try {
    var combinedArray;

    if (terrainId === "65a26f3e1c912c4b41ccc4a7") {
      var grandTerrainBookings = await Bookings.find({ date, terrainId });
      var terrainABookings = await Bookings.find({
        date,
        terrainId: "65a26f831c912c4b41ccc4a9",
      });
      var terrainBBookings = await Bookings.find({
        date,
        terrainId: "65a26fd01c912c4b41ccc4ab",
      });
      var terrainCBookings = await Bookings.find({
        date,
        terrainId: "65a271ef1c912c4b41ccc4ae",
      });
      combinedArray = [
        ...grandTerrainBookings,
        ...terrainABookings,
        ...terrainBBookings,
        ...terrainCBookings,
      ];
    }
    else if(terrainId === "65a26f831c912c4b41ccc4a9" || terrainId === "65a26fd01c912c4b41ccc4ab" || terrainId === "65a271ef1c912c4b41ccc4ae"){
      var terrainBookings = await Bookings.find({ date, terrainId });
      var grandTerrainBookings = await Bookings.find({ date, terrainId: "65a26f3e1c912c4b41ccc4a7" });
      combinedArray = [
        ...grandTerrainBookings,
        ...terrainBookings
      ];
    }
    else if(terrainId === "65a273381c912c4b41ccc4b6"){
      var basketBookings = await Bookings.find({ date, terrainId });
      var volleyBookings = await Bookings.find({ date, terrainId: "65a273861c912c4b41ccc4b8" });
      combinedArray = [
        ...basketBookings,
        ...volleyBookings
      ];
    }
    else if(terrainId === "65a273861c912c4b41ccc4b8"){
      var volleyBookings = await Bookings.find({ date, terrainId });
      var basketBookings = await Bookings.find({ date, terrainId: "65a273381c912c4b41ccc4b6" });
      combinedArray = [
        ...basketBookings,
        ...volleyBookings
      ];
    }
    else if(terrainId === "65a2817ac29070d467610732"){
      var tennisBookings = await Bookings.find({ date, terrainId });
      combinedArray = tennisBookings;
    }

    res.status(200).json({
      message: "Bookings retrieved successfully",
      combinedArray,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Couldn't get all bookings", error: error.message });
  }
};

const getBookingById = async (Id) => {
  try {
    const booking = await Bookings.findById({ _id: Id });
    return booking;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getBookingsByDateAndTerrain,
  getBookingsByUserId,
  getBookingsByDateAndTime,
  addBookingByUser,
  addBookingByAdmin,
  findOne,
  getAll,
  deleteBooking,
  updateBooking,
  getBookingsByDate,
};
