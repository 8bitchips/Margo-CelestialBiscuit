const express = require("express");
const { login, logout, getMail, protectRoute } = require("../controller/authController");
const authRouter = express.Router();
authRouter.use(protectRoute)
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/mail", getMail);

module.exports = authRouter;
