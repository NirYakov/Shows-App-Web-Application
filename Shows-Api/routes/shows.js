const express = require("express");

const ShowsController = require("../controllers/shows");

const myTestMiddleware = require("../middleware/my-tests-middleware");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// api/shows/


router.get("/", checkAuth, ShowsController.GetUserShows);

router.post("/", checkAuth, myTestMiddleware, ShowsController.CreateUserShow);

router.put("/:id", ShowsController.UpdateUserShow);

router.delete("/:id", ShowsController.deleteUserShow);


module.exports = router;