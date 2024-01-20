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
} = require("../controllers/userController");

router.get("/getAll", getAll);
router.get("/getById/:Id", findOne);
router.post("/getByRole", findByRole);
router.post("/login", login);
router.post("/register", register);
router.delete("/delete/:Id", deleteUser);
router.put("/update/:Id", updateUser);

module.exports = router;
