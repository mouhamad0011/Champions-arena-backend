const Store = require("../models/storeModel");
const {FileUpload} = require('../middlewares/imageUploader.js');

const addItem = async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            success: false,
            message: 'Please provide an image for the item.',
        });
    }
    const imageUploadResult = await FileUpload(file);
    const image = imageUploadResult.downloadURL;
    const { item, price, info} = req.body;
    try {
        if (!item || !price || !image )throw Error("All fields must be filled!");
        const newItem = await Store.create({
            item,
            price,
            image,
            info
        });
        res.status(200).json({ message: "Item added successfully",newItem });
    } catch (error) {
        res.status(500).json({ message: "Failed to add an item", error: error.message });
    }
}

const findOne = async (req, res) => {
    const {Id} = req.params;
    try {
        if (!Id) throw Error("No id detected to continue");
        const item = await Store.findById({ _id:Id });
        if (!item) throw Error("An error occured");
        res.status(200).json({ message: "Item retrieved successfully", item });
    } catch (error) {
        res.status(500).json({ message: "failed to get the item", error: error.message });
    }
}

const getAll = async (req, res) => {
    try {
        const items = await Store.find({});
        res.status(200).json({ message: "Items retrieved successfully", items });
    } catch (error) {
        res.status(500).json({ message: "Couldn't get all items", error: error.message })
    }
}

const deleteItem = async (req, res) => {
    const { Id } = req.params;
    try {
        if(!Id)throw Error("No id passed as parameter");
        const resultat = await Store.findByIdAndDelete({ _id:Id });
        if (!resultat) throw Error("An error occured");
        const items =await Store.find({});
        res.status(200).json({ message: "item deleted successfully", items});
    } catch (error) {
        res.status(500).json({ message: "An error occured while deleting the item", error: error.message })
    }
}

const updateItem = async (req, res) => {
    var image="";
    if(req.file){
      const file = req.file;
      const imageUploadResult = await FileUpload(file);
      image = imageUploadResult.downloadURL;
    }
    const { item, price, info } = req.body;
    const { Id } = req.params
    try {
        if (!Id) throw Error("No id sent as parameter");
        var resultat = "";
        if(req.file){
             resultat = await Store.findByIdAndUpdate({ _id:Id }, { item, price, image, info });
        }
        else{
             resultat = await Store.findByIdAndUpdate({ _id:Id }, { item, price, info });
        }
        if(!resultat)throw Error("Error while updating");
        const newItem=await getItemById(Id);
        res.status(200).json({ message: "Item updated successfully" ,newItem});
    } catch (error) {
        res.status(500).json({ message: "Failed to update the item", error: error.message })
    }
}



const getItemById = async(Id)=>{
    try {
      const item= await Store.findById({_id:Id});
      return item;
    } catch (error) {
      return error;
    }
  }


  module.exports = {addItem, findOne, getAll, deleteItem, updateItem};