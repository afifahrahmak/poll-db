"use strict";

const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

router.get("/", Controller.readAll); // /softdrinks
router.get("/add", Controller.addGet);
router.post("/add", Controller.addPost);
router.get("/edit/:id", Controller.editGet);
router.post("/edit/:id", Controller.editPost);

module.exports = router;
