const express = require("express");

const FriendController = require("../controllers/friend");

const myTestMiddleware = require("../middleware/my-tests-middleware");

const router = express.Router();



router.get("/search/:friendname", myTestMiddleware, FriendController.SearchFindUser);

router.get("/:friendname", myTestMiddleware, FriendController.SearchFindUser);

// router.post("/", myTestMiddleware, ShowsController.CreateUserShow);

// router.put("/:id", ShowsController.UpdateUserShow);

// router.delete("/:id", ShowsController.deleteUserShow);


module.exports = router;