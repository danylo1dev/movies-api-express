const express = require("express");
const router = express.Router();
const movieDetails = require("../data/movie-deteils");
const { response } = require("../app");

function requireJSON(req, res, next) {
  if (!req.is("application/json")) {
    res.json({ msg: "Content type must be application/json" });
  } else {
    next();
  }
}
router.get("/top_rated", (req, res, next) => {
  const page = req.query.page || 1;
  const indexToStart = (page - 1) * 20;
  const result = movieDetails
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(indexToStart, indexToStart + 19);

  res.json(result);
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const result = movieDetails.find((movie) => movie.id == id);
  res.json(result || {});
});

router.post("/:id/rating", requireJSON, (req, res, next) => {
  const userRating = req.body.value;
  if (userRating < 0.5 || userRating > 10) {
    res.status(201).json({ msg: "Rating must be betwen .5 and 10" });
  } else {
    res.json({ msg: "Thank you for your Rating" });
  }
});

router.delete("/:id/rating", (req, res) => {
  res.json({ msg: "Rating deleted" });
});
module.exports = router;
