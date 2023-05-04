const express = require("express");
const router = express.Router();

router.get("/todos", (req, res) => {
  res.send("hello world");
});

module.exports = router;
