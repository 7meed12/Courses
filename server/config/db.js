const  Sequelize  = require('sequelize');

const sequelize = new  Sequelize('courses',  'root', '', {
    host: 'localhost',
    dialect:  'mysql'
  });
 
 module.exports= sequelize;



 
 