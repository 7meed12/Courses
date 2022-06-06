const Sequelize = require('sequelize');
const sequelize = require('../config/db');

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
    },
    isAdmin:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    isDisabled:{
        type: Sequelize.BOOLEAN,
        defaultValue: false}

})

module.exports = User;