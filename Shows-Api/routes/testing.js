const express = require("express");
const TestingController = require("../controllers/testing");
const myTestMiddleware = require("../middleware/my-tests-middleware");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/poll", myTestMiddleware, TestingController.testingPollOnlyXTimes);

router.get("/search/:searchShow", myTestMiddleware, TestingController.TestExternalApis);

router.get("/middleware", checkAuth, TestingController.testingMiddleware);

module.exports = router;