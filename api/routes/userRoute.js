const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/check-auth')

router.post('/signup', userController.user_signup);

// Post Login User
router.post("/login", userController.user_login);

// Delete User
router.delete("/:userId",checkAuth, userController.user_delete);
  
module.exports = router;