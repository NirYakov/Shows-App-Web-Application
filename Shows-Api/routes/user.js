const express = require("express");

const UserController = require("../controllers/user");
const myTestMiddleware = require("../middleware/my-tests-middleware");

const router = express.Router();

router.post("/signup", myTestMiddleware, UserController.createUser);

router.post("/login", myTestMiddleware, UserController.userLogin);

module.exports = router;
