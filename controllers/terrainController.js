const Terrains = require("../models/terrainModel");
const {FileUpload} = require('../middlewares/imageUploader.js');

const addTerrain = async (req, res) => {
  const file = req.file;
    if (!file) {
        return res.status(400).json({
            success: false,
            message: 'Please provide an image for the stadium.',
        });
    }
    const imageUploadResult = await FileUpload(file);
    const image = imageUploadResult.downloadURL;
  const { name, sport, available, hourPrice, dimensions } = req.body;
  try {
    if (!name || !available || !hourPrice || !image || !dimensions || !sport)
      throw Error("All fields must be filled!");
    const newTerrain = await Terrains.create({
      name,
      sport,
      available,
      hourPrice,
      image,
      dimensions
    });
    res.status(200).json({ message: "Terrain added successfully", newTerrain });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add le terrain", error: error.message });
  }
};

const findOne = async (req, res) => {
  const { Id } = req.params;
  try {
    if (!Id) throw Error("No id detected to continue");
    const terrain = await Terrains.findById({ _id: Id });
    if (!terrain) throw Error("An error occured");
    res.status(200).json({ message: "Terrain retrieved successfully", terrain });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to get le terrain", error: error.message });
  }
};

const getAll = async (_, res) => {
  try {
    const terrains = await Terrains.find({});
    res.status(200).json({ message: "Terrains retrieved successfully", terrains });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Couldn't get all terrains", error: error.message });
  }
};

const deleteTerrain = async (req, res) => {
  const { Id } = req.params;
  try {
    if (!Id) throw Error("No id passed as parameter");
    const resultat = await Terrains.findByIdAndDelete({ _id: Id });
    if (!resultat) throw Error("An error occured");
    const terrains = await Terrains.find({});
    res.status(200).json({ message: "terrain deleted successfully", terrains });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occured while deleting le terrain",
        error: error.message,
      });
  }
};

const updateTerrain = async (req, res) => {
  var image="";
  if(req.file){
    const file = req.file;
  const imageUploadResult = await FileUpload(file);
  image = imageUploadResult.downloadURL;
  }
  
  const { name, sport, available, hourPrice, dimensions } = req.body;
  const { Id } = req.params;
  try {
    if (!Id) throw Error("No id sent as parameter");
    var resultat="";
    if(req.file){
       resultat= await Terrains.findByIdAndUpdate(
        { _id: Id },
        { name, sport, available, hourPrice, image, dimensions }
      );
    }
    else{
      resultat = await Terrains.findByIdAndUpdate(
        { _id: Id },
        { name, sport, available, hourPrice, dimensions }
      );
    }
    if (!resultat) throw Error("Error while updating");
    const newTerrain = await getTerrainById(Id);
    res.status(200).json({ message: "terrain updated successfully", newTerrain });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update le terrain", error: error.message });
  }
};

const getTerrainById = async (Id) => {
  try {
    const terrain = await Terrains.findById({ _id: Id });
    return terrain;
  } catch (error) {
    return error;
  }
};


const getTerrainsBySport = async (req, res) => {
  const { sport }= req.body
  try {
    const terrains = await Terrains.find({ sport });
    res.status(200).json({ message: "Terrains retrieved successfully", terrains });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Couldn't get ${sport} terrains`, error: error.message });
  }
};

module.exports = { addTerrain, findOne, getAll, deleteTerrain, updateTerrain, getTerrainsBySport };
