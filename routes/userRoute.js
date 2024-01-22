const express = require("express");
const router = express.Router();
const {
  findByRole,
  register,
  login,
  findOne,
  getAll,
  deleteUser,
  updateUser,
  updateProfile
} = require("../controllers/userController");

router.get("/getAll", getAll);
router.get("/getById/:Id", findOne);
router.post("/getByRole", findByRole);
router.post("/login", login);
router.post("/register", register);
router.delete("/delete/:Id", deleteUser);
router.put("/update/:Id", updateUser);
router.put("/updateProfile/:Id", updateProfile);


module.exports = router;
