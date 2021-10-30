const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const viewRouter = require("./router/viewRouter");
const authRouter = require("./router/authRouter");
const callRouter = require("./router/callRouter");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

// view engine se
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use("/auth", authRouter);
app.use("/call",callRouter)
app.use("/", viewRouter);


let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("server started at port 3000");
});
