const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/register' , userController.registerUser);
router.post('/login' , userController.checkUser,userController.loginUser);
router.get('/logout' , userController.logoutUser);
router.post('/resgisterCourse' ,userController.checkUser,userController.registerCourse);
router.delete('/cancelCourse/:id' ,userController.checkUser,userController.cancelCourse);



module.exports = router; 
