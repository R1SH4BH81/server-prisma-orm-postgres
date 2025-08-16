const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/auth.controllers");

router.post("/r", register);
router.post("/l", login);

module.exports = router;
