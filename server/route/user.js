const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/register' , userController.registerUser);
router.post('/login' , userController.loginUser);
router.get('/logout' , userController.logoutUser);
router.post('/resgisterCourse' ,passport.authenticate('jwt' , {session:false}),userController.registerCourse);
router.delete('/cancelCourse/:id' ,passport.authenticate('jwt' , {session:false}),userController.cancelCourse);


module.exports = router;
