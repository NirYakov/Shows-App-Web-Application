const express = require("express");

const ShowsGameController = require("../controllers/showsGame");

const router = express.Router();


router.get("/tv", ShowsGameController.GetShowsGameTv);

router.get("/movies", ShowsGameController.GetShowsGameMovies);

module.exports = router;