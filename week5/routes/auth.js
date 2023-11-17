const express = require('express');
const router  = express.Router();

const authController = require('../controllers/auth');



//we are getting the info from register.hbs
router.post("/register", authController.register); 





module.exports = router;
