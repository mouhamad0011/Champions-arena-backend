const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {
  addTerrain,
  findOne,
  getAll,
  deleteTerrain,
  updateTerrain,
  getTerrainsBySport
} = require("../controllers/terrainController");
const { authenticated } = require("../middlewares/auth");

router.get("/getAll", getAll);
router.get("/getById/:Id", findOne);
router.post("/add",upload.single('file'), addTerrain);
router.post("/getBySport", getTerrainsBySport);
router.delete("/delete/:Id", authenticated("admin"), deleteTerrain);
router.put("/update/:Id",upload.single('file'), updateTerrain);

module.exports = router;
