const express = require('express');
const router = express.Router();
const UserModel = require("../models/userModel");
const {
  hasCookie
} = require("../controllers/auth");
const {
  encrypt,
  enums,
  secureToken
} = require("../libs");

// login
router.get("/login", hasCookie, (req, res) =>{
  res.render("loginPage");
});

router.post("/login", async (req, res)=>{
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({username});
    // if not null
    if(!user) throw {
      status:enums.STATUS_CODE.BAD_REQUEST,
      message:"Username not found!"
    };
    
    // if password not matched
    if(!await encrypt.match(password, user.password)) throw {
      status:enums.STATUS_CODE.BAD_REQUEST,
      message:"Password not matched!"
    };

    // create cookie
    const token = await secureToken.sign(user._id.toString());
    res.cookie(process.env.COOKIE_NAME || "test", token);
    res.redirect("/profile");
  } catch (error) {
    res.render("loginPage", { error });
  }
});

router.post("/signup", async (req, res)=>{
  try {
    // avoid the deblication of usernames ...
    const hashedPassword = await encrypt
      .hash(req.body?.password);
    const user = new UserModel({
      ...req.body,
      password:hashedPassword
    });
    const createdUser = await user.save();
    res.render("loginPage", {
      error:{
        message:`Dear ${createdUser.fullName}, your user has been created!`
      }
    });
  } catch (error) {
    res.send("loginPage", { error })
  }
});


// logout user
router.get("/logout", (req, res)=>{
  res.clearCookie(process.env.COOKIE_NAME || "test");
  res.redirect("login");
})



module.exports = router;