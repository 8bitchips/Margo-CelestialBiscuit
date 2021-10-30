const express = require("express");
const { callHandler, sendMail } = require("../controller/callController");
const callRouter = express.Router();

callRouter.post("/connect", callHandler);
callRouter.post("/mail", sendMail);
module.exports = callRouter