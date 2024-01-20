const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {
  addItem,
  findOne,
  getAll,
  deleteItem,
  updateItem,
} = require("../controllers/cafeteriaController");

router.get("/getAll", getAll);
router.get("/getById/:Id", findOne);
router.post("/add", upload.single('file'), addItem);
router.delete("/delete/:Id", deleteItem);
router.put("/update/:Id", upload.single('file'), updateItem);

module.exports = router;
