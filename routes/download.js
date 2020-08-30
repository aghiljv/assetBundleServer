const express = require("express");
const router = express.Router();

//download the desired file by name
router.get("/:name", function (req, res) {
  res.download(__dirname + "/../ABs/" + req.params.name, req.params.name);
});

module.exports = router;
