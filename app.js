const express = require('express');
const app = express();
const cors = require('cors');
//db connection
const sequelize = require('./server/config/db');
const Course = require('./server/models/course');
const Category = require('./server/models/category');
const User = require('./server/models/user');
const courseCategory = require('./server/models/course_category');
//jwt auth 
const passport = require('passport');
require('./server/config/passport')(passport);
app.use(passport.initialize());

//routes
const courseRoute = require('./server/route/course');
const categoryRoute = require('./server/route/category')
const userRoute = require('./server/route/user');
const port = process.env.PORT || 5000;

 app.use(express.json());
 app.use(express.urlencoded({ extended: true })); 
 app.use(express.static('public'));
 app.use(cors());
 app.use('/course', courseRoute);
 app.use('/category',categoryRoute);
 app.use('/user',userRoute);
 app.listen(port, () => console.log(`Listening on port ${port}`));




 //sequelize.sync({force: false})
