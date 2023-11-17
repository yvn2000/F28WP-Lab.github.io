const express = require('express');
const router  = express.Router();


//ROUTES

router.get ("/", (req, res) => {
    //res.send("<h1>HOME PAGE</h1>")
    res.render("index")           //load profile.hbs, no need for.hbs

});

router.get ("/profile", (req, res) => {
    res.render("profile")           //load profile.hbs, no need for.hbs

});

router.get ("/register", (req, res) => {
    res.render("register")           //load profile.hbs, no need for.hbs

});

module.exports = router;
