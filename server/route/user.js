const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/register' , userController.registerUser);
router.get('/users', userController.getUsers);
router.post('/login' , userController.checkUser,userController.loginUser);
router.post('/disable' , userController.disableUser);
router.get('/logout' , userController.logoutUser);
router.post('/delete' , userController.deleteUser);
router.post('/registerCourse' ,userController.registerCourse);
router.delete('/cancelCourse/:id' ,userController.checkUser,userController.cancelCourse);




module.exports = router; 
