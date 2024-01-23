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
const { authenticated } = require("../middlewares/auth");

router.get("/getAll", getAll);
router.get("/getById/:Id", findOne);
router.post("/add", upload.single('file'), addItem);
router.delete("/delete/:Id", authenticated("admin"), deleteItem);
router.put("/update/:Id", authenticated("admin"), upload.single('file'), updateItem);

module.exports = router;
