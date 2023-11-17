const express = require('express');
const router  = express.Router();


//ROUTES

router.get ("/", (req, res) => {
    //res.send("<h1>HOME PAGE</h1>")
    res.render("index")           

});

router.get ("/profile", (req, res) => {
    res.render("profile")           //load profile.hbs, no need for.hbs

});

router.get ("/register", (req, res) => {
    res.render("register")           

});

router.get ("/login", (req, res) => {
    res.render("login")           

});

module.exports = router;
