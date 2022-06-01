const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/create', categoryController.createCategory);
router.put('/update/:id', categoryController.updateCategory);
router.delete('/delete/:id', categoryController.deleteCategory);

 module.exports= router;
 