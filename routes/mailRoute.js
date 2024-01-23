const express = require("express");
const router = express.Router();
const {
  sendEmailToUser
  } = require("../controllers/mailController");

router.post("/sendEmail", sendEmailToUser);

module.exports = router;