const express = require("express");
const TestingController = require("../controllers/testing");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/poll", TestingController.testingPollOnlyXTimes);

router.get("/middleware", checkAuth, TestingController.testingMiddleware);

module.exports = router;