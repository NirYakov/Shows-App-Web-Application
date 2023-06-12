const express = require("express");

const FriendController = require("../controllers/friend");

const myTestMiddleware = require("../middleware/my-tests-middleware");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");



router.get("/search/:friendname", checkAuth, myTestMiddleware, FriendController.SearchFindUser);

router.post("/:friendname", checkAuth, myTestMiddleware, FriendController.AddFriend);

router.get("", checkAuth, myTestMiddleware, FriendController.GetFriends);

// router.get("/:friendname", myTestMiddleware, FriendController.SearchFindUser);

// router.post("/", myTestMiddleware, ShowsController.CreateUserShow);

// router.put("/:id", ShowsController.UpdateUserShow);

// router.delete("/:id", ShowsController.deleteUserShow);


module.exports = router;