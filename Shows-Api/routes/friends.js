const express = require("express");

const FriendController = require("../controllers/friend");

const myTestMiddleware = require("../middleware/my-tests-middleware");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");



router.get("/search/:friendname", checkAuth, FriendController.SearchFindUser);

router.post("/:friendname", checkAuth, FriendController.AddFriend);

router.get("", checkAuth, FriendController.GetFriends);

router.get("/:friendId", checkAuth, FriendController.GetFriendsShows);

router.get("/joint/:friendId", checkAuth, FriendController.GetJointShows);

router.get("/different/:friendId", checkAuth, FriendController.GetDifferentShows);

// router.get("/:friendname", myTestMiddleware, FriendController.SearchFindUser);

// router.post("/", myTestMiddleware, ShowsController.CreateUserShow);

// router.put("/:id", ShowsController.UpdateUserShow);

// router.delete("/:id", ShowsController.deleteUserShow);


module.exports = router;