const express = require("express");

const ShowsController = require("../controllers/shows");

const myTestMiddleware = require("../middleware/my-tests-middleware");

const router = express.Router();

// api/shows/


router.get("/", ShowsController.GetUserShows);

router.post("/", myTestMiddleware, ShowsController.CreateUserShow);

router.put("/:id", ShowsController.UpdateUserShow);

router.delete("/:id", ShowsController.deleteUserShow);


module.exports = router;