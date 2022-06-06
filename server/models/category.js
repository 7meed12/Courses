const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Course = require('./course');

const Category = sequelize.define('category', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true},
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }

})

module.exports = Category;
