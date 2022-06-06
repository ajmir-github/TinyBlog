const {
  secureToken
} = require("../libs");
const UserModel = require("../models/userModel");


exports.authCookie = async function (req, res, next) {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME || "test"];
    const userID = await secureToken.verfy(cookie);
    const user = await UserModel.findById(userID);
    req.payload = user;
    next();
  } catch ({status, message}) {
    res.render("login", {message});
  }
}


exports.hasCookie = async function (req, res, next){
  // if login in go to profile
  const cookie = req.cookies[process.env.COOKIE_NAME || "test"];
  if(typeof cookie === "undefined"){
    next();
  } else {
    res.redirect("/profile");
  }
}

exports.isUserLoggedIn = async function (req, res, next) {
 // If not login next
 try {
    const cookie = req.cookies[process.env.COOKIE_NAME || "test"];
    if(typeof cookie === "undefined"){
      req.payload = { loggedIn: false };
    } else {
      const userID = await secureToken.verfy(cookie);
      const user = await UserModel.findById(userID);
      req.payload = { loggedIn: true, user };
    }
    next();
  } catch ({message, status}) {
    res.render("errorPage", { message, status });
  }
}