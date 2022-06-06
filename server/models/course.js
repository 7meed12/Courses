const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Course = sequelize.define('course', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: true},
    maxPoints:{
        type: Sequelize.INTEGER,
        allowNull: true
    }
})

module.exports = Course;