const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {
  addEvent,
  findOne,
  getAll,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");

router.get("/getAll", getAll);
router.get("/getById/:Id", findOne);
router.post("/add", upload.single('file'), addEvent);
router.delete("/delete/:Id", deleteEvent);
router.put("/update/:Id", upload.single('file'), updateEvent);

module.exports = router;
