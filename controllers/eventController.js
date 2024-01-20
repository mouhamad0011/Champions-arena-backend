const Events = require("../models/eventModel");
const {FileUpload} = require('../middlewares/imageUploader.js');
const Bookings = require("../models/bookingModel");
const Terrains = require("../models/terrainModel");

const addEvent = async (req, res) => {
  const file = req.file;
  if (!file) {
      return res.status(400).json({
          success: false,
          message: 'Please provide an image for the event.',
      });
  }
  const imageUploadResult = await FileUpload(file);
  const image = imageUploadResult.downloadURL;
  const { terrainId, price, date, time, duration, title, description } =
    req.body;
  try {
    if (
      !terrainId ||
      !price ||
      !image ||
      !date ||
      !time ||
      !duration ||
      !title ||
      !description
    )
      throw Error("All fields must be filled!");
      const exist = await Bookings.find({terrainId, date, time});
      if(exist.length > 0){
        return res.status(400).json({message: `This stadium is already booked on ${date} at this time`})
      }
      const terrainName = await Terrains.findById({_id : terrainId});
      const grandTerrain = await Terrains.findOne({name : "Grand Terrain"});
      const terrainA = await Terrains.findOne({name : "Terrain A"});
      const terrainB = await Terrains.findOne({name : "Terrain B"});
      const terrainC = await Terrains.findOne({name : "Terrain C"});
      const basket = await Terrains.findOne({name : "Basket court"});
      const volley = await Terrains.findOne({name : "Volley court"});
      const tennis = await Terrains.findOne({name : "Tennis court"});

      if(terrainName.name === "Grand terrain"){
        await Bookings.create({
          terrainId,
          firstName : "Event",
          lastName : "Event",
          email : "Event",
          date,
          time,
          duration,
          bill : 0,
        });
        await Bookings.create({
          terrainId : terrainA._id,
          firstName : "Event",
          lastName : "Event",
          email : "Event",
          date,
          time,
          duration,
          bill : 0,
        });
        await Bookings.create({
          terrainId: terrainB._id,
          firstName : "Event",
          lastName : "Event",
          email : "Event",
          date,
          time,
          duration,
          bill : 0,
        });
        await Bookings.create({
          terrainId: terrainC._id,
          firstName : "Event",
          lastName : "Event",
          email : "Event",
          date,
          time,
          duration,
          bill : 0,
        });
      }
      else if(terrainName.name === "Terrain A"){
        await Bookings.create({
          terrainId,
          firstName : "Event",
          lastName : "Event",
          email : "Event",
          date,
          time,
          duration,
          bill : 0,
        });
        await Bookings.create({
          terrainId : grandTerrain._id,
          firstName : "Event",
          lastName : "Event",
          email : "Event",
          date,
          time,
          duration,
          bill : 0,
        });
      }
      else if(terrainName.name === "Terrain B"){
        await Bookings.create({
          terrainId,
          firstName : "Event",
          lastName : "Event",
          email : "Event",
          date,
          time,
          duration,
          bill : 0,
        });
        await Bookings.create({
          terrainId : grandTerrain._id,
          firstName : "Event",
          lastName : "Event",
          email : "Event",
          date,
          time,
          duration,
          bill : 0,
        });
      }else if(terrainName.name === "Terrain C"){
        await Bookings.create({
          terrainId,
          firstName : "Event",
          lastName : "Event",
          email : "Event",
          date,
          time,
          duration,
          bill : 0,
        });
        await Bookings.create({
          terrainId : grandTerrain._id,
          firstName : "Event",
          lastName : "Event",
          email : "Event",
          date,
          time,
          duration,
          bill : 0,
        });
      }
      else if(terrainName.name === "Basket court"){
        await Bookings.create({
          terrainId,
          firstName : "Event",
          lastName : "Event",
          email : "Event",
          date,
          time,
          duration,
          bill : 0,
        });
        await Bookings.create({
          terrainId : volley._id,
          firstName : "Event",
          lastName : "Event",
          email : "Event",
          date,
          time,
          duration,
          bill : 0,
        });
      }
      else if(terrainName.name === "Volley court"){
        await Bookings.create({
          terrainId,
          firstName : "Event",
          lastName : "Event",
          email : "Event",
          date,
          time,
          duration,
          bill : 0,
        });
        await Bookings.create({
          terrainId : basket._id,
          firstName : "Event",
          lastName : "Event",
          email : "Event",
          date,
          time,
          duration,
          bill : 0,
        });
      }
      else if(terrainName.name === "Tennis court"){
        await Bookings.create({
          terrainId,
          firstName : "Event",
          lastName : "Event",
          email : "Event",
          date,
          time,
          duration,
          bill : 0,
        });
      }
    const newEvent = await Events.create({
      terrainId,
      price,
      image,
      date,
      time,
      duration,
      title,
      description,
    });
    res.status(200).json({ message: "Event added successfully", newEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add the event", error: error.message });
  }
};

const findOne = async (req, res) => {
  const { Id } = req.params;
  try {
    if (!Id) throw Error("No id detected to continue");
    const event = await Events.findById({ _id: Id });
    if (!event) throw Error("An error occured");
    res.status(200).json({ message: "Event retrieved successfully", event });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to get the event", error: error.message });
  }
};

const getAll = async (_, res) => {
  try {
    const events = await Events.find({})
    .populate({
      path : "terrainId",
      model : "terrains",
      select : " name "
    })
    res.status(200).json({ message: "Events retrieved successfully", events });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Couldn't get all Events", error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { Id } = req.params;
  try {
    if (!Id) throw Error("No id passed as parameter");
    const resultat = await Events.findByIdAndDelete({ _id: Id });
    if (!resultat) throw Error("An error occured");
    const events = await Events.find({});
    res.status(200).json({ message: "Event deleted successfully", events });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while deleting the event",
      error: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  var image="";
  if(req.file){
    const file = req.file;
    const imageUploadResult = await FileUpload(file);
    image = imageUploadResult.downloadURL;
  }
  const { terrainId, price, date, time, duration, title, description } = req.body;
  const { Id } = req.params;
  try {
    if (!Id) throw Error("No id sent as parameter");
    var resultat = "";
    if(req.file){
      resultat = await Events.findByIdAndUpdate(
        { _id: Id },
        { terrainId, price, image, date, time, duration, title, description }
      );
    }
    else{
      resultat = await Events.findByIdAndUpdate(
        { _id: Id },
        { terrainId, price, date, time, duration, title, description }
      );
    }
    if (!resultat) throw Error("Error while updating");
    const newEvent = await getEventById(Id);
    res.status(200).json({ message: "Event updated successfully", newEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update th event", error: error.message });
  }
};

const getEventById = async (Id) => {
  try {
    const event = await Events.findById({ _id: Id });
    return event;
  } catch (error) {
    return error;
  }
};

module.exports = { addEvent, findOne, getAll, deleteEvent, updateEvent };
