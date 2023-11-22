const express = require('express');
const router  = express.Router();

authController = require('../controllers/auth');


router.use(authController.isLoggedIn);

//ROUTES

router.get ("/", (req, res) => {
    res.render("index", {
        user: req.user
    });

});

router.get ("/profile", (req, res) => {
    res.render("profile", {
        user: req.user
    })           //load profile.hbs, no need for.hbs
});

router.get ("/register", (req, res) => {
    res.render("register")           

});

router.get ("/login", (req, res) => {
    res.render("login")           

});

module.exports = router;
