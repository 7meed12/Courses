const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Course = require('./course');
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true},
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    hash : {
        type: Sequelize.STRING,
        allowNull: false
    },
    salt : {
        type: Sequelize.STRING,
        allowNull: false
    }

})

module.exports = User;