const jwt = require("jsonwebtoken");
const SECRET_KEY = "vne;ogntoing etl;kbnt4gnfp etpibipemvpirbhm4pi";
const login = async (req, res) => {
  try {
    const token = jwt.sign({ id: req.body.id }, SECRET_KEY);
    res.cookie("jwt", token, { httpOnly: true });
    res.status(200).json({
      message: "Succesfully Signed up !!",
    });
  } catch (err) {
    res.status(404).json({
      msg: "Failed to login",
    });
  }
};

async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;
    const payload = jwt.verify(token, SECRET_KEY);
    if (payload) {
      req.id = payload.id;
    }
    next();
  } catch (error) {
    next();
  }
}

const getMail = async (req, res) => {
  try {
    res.status(200).json({
      id: req.id,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed",
    });
  }
};

async function logout(req, res) {
  try {
    res.clearCookie("jwt");
    res.redirect("/");
  } catch (error) {
    res.status(501).json({
      error,
    });
  }
}

module.exports.login = login;
module.exports.protectRoute = protectRoute;
module.exports.logout = logout;
module.exports.getMail = getMail;
