const express = require("express");
const router = express.Router();

const {create, read } = require("./controllers.js")

router.post("/dados", create);
router.get("/dados", read);

module.exports = router;