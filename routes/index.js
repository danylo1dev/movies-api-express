const express = require("express");
const router = express.Router();
const movies = require("../data/movies");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("popular", (req, res, next) => {
  const page = req.query.page || 1;
  const indexToStart = (page - 1) * 20;
  const result = movies
    .filter((movie) => movie.most_popular)
    .slice(indexToStart, indexToStart + 19);

  res.json({
    page,
    result,
  });
});

module.exports = router;
