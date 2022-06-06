const User = require('../models/user');
const Course = require('../models/course');
const userCourse = require('../models/user_course');
const utils = require('../lib/utils');
const jwt = require('jsonwebtoken');
const key = require('../config/keys');

exports.getUsers=(req,res)=>{
    User.findAll({
        include:[
            {
                model: Course,
                attributes: ['id', 'name' , 'maxPoints'],
                through: {
                    attributes: ['userId','courseId' ]}
            
        }]
    }).then(users => {
        res.send(users);
    })
}



exports.registerUser = (req, res)=> {
    const saltHash = utils.genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    
    User.create({
        username: req.body.username,
        hash : hash,
        salt : salt,
    }).then(user =>{
        const jwt = utils.issueJWT(user);
        res.json({user : user , token : jwt.token , expiresIn : jwt.expiresIn});
    })}

exports.loginUser = (req, res)=> {
    User.findOne({where:{username : req.body.username}
    })
        .then(user => {
            if(!user) return res.send({message : 'inavlid Inputs'});
            const valid = utils.validPassword(req.body.password, user.hash, user.salt);
            if(!valid) return res.send({message : 'Invalid password'});
            if(user.isDisabled) return res.send({message : 'User is disabled'});
            const jwt = utils.issueJWT(user);
            return res.send({username : user.username , token : jwt.token , expiresIn : jwt.expiresIn});
        }).catch(err => res.send({message : err.message}));
    }
exports.logoutUser = (req, res)=> {
    res.clearCookie('jwt');
    res.json({message : 'Success'});
}


exports.registerCourse=(req, res)=> {
    const token = req.body.token;
    if(!token) return res.status(401).json({message : 'Unauthorized'});
    try {
        const decoded = jwt.verify(token, key.secretOrKey);
        console.log(decoded);
            userCourse.create({
                userId : decoded.sub,
                courseId: req.body.courseId
            }).then(user => {
                res.send(user);
            }).catch(err => res.send({message : 'Already registered'}));
    } catch(err) {
        return res.status(401).json({message : 'Unauthorized'});
    }
};
exports.cancelCourse=(req, res)=> {
    const token = req.cookies.jwt;
    if(!token) return res.status(401).json({message : 'Unauthorized'});
    try {
        const decoded = jwt.verify(token, key.secretOrKey);
        User.findOne({where:{id : decoded.id}})
            .then(user => {
                if(user.courseId == req.body.courseId) return res.json({message : 'Already registered'});
                User.destroy({
                    where:{courseId : req.body.courseId}
                }).then(user => {
                    res.send(user);
                })
            })
    } catch(err) {
        return res.status(401).json({message : 'Unauthorized'});
    }
}
exports.disableUser = (req, res)=> {
    User.update( {
        isDisabled : req.body.status
    },
    {where : {id : req.body.id}})
        .then(user => res.send(user))
        .catch(err => res.send({message : err.message}));
}

exports.deleteUser = (req, res)=> {
    User.destroy({
        where : {id : req.body.id}}
    )
}
exports.checkUser=(req,res, next)=>{
    const token = req.body.token;
    if(token){
        jwt.verify(token, key.secretOrKey, (err, decoded) =>{ 
            if(err){ res.message = 'Invalid token';
                        next();}
            else {
               User.findOne({where:{id : decoded.sub}})
                .then(user => { res.send({username : user.username});})}  })
    }else { res.message='Invalid token';
                next() }
}

