"use strict";

const express = require("express");
const Controller = require("../controllers");
const router = express.Router();
const softdrinksRoute = require("./softdrinks");

router.get("/", Controller.getHome)
router.use("/softdrinks", softdrinksRoute);

module.exports = router;
