// imports
const express = require('express');
const dotenv = require("dotenv");
const { database } = require("./libs");
const cookieParser = require("cookie-parser");
const path = require("path");

// global vars
dotenv.config(".env")
const port = process.env.PORT || 3000;
const databaseName = process.env.DATABASE_NAME || "test";

// settings
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Database
database(`mongodb://localhost:27017/${databaseName}`, true);


// routers
app.use(require("./routers/homePage"));
app.use("/auth", require("./routers/loginPage"));
app.use("/profile", require("./routers/profilePage"));

// error page
app.use("*", (req, res)=> res.render("errorPage", {
 error:{
    status:404,
    message:"The entered URL is not found!"
 }
}));

// server listener
app.listen(port, ()=> console.log(`--- Server listening on port: ${port}`));