const express = require('express');
const router  = express.Router();

const authController = require('../controllers/auth');



//we are getting the info from register.hbs
router.post("/register", authController.register); 

router.post("/login", authController.login);

router.get("/logout", authController.logout);





module.exports = router;
