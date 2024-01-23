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
const { authenticated } = require("../middlewares/auth");

router.get("/getAll", getAll);
router.get("/getById/:Id", findOne);
router.post("/add", upload.single('file'), addEvent);
router.delete("/delete/:Id", authenticated("admin"), deleteEvent);
router.put("/update/:Id", authenticated("admin"), upload.single('file') , updateEvent);

module.exports = router;
