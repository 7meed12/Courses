const User = require('../models/user');
const utils = require('../lib/utils');
const jwt = require('jsonwebtoken');
const key = require('../config/keys');

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
    })
      

}

exports.loginUser = (req, res)=> {
    console.log('hi')
    User.findOne({where:{username : req.body.username}})
        .then(user => {
            if(!user) return res.json({message : 'inavlid Inputs'});
            const valid = utils.validPassword(req.body.password, user.hash, user.salt);
            if(!valid) return res.json({message : 'Invalid password'});
            const jwt = utils.issueJWT(user);
            res.cookie('jwt', jwt.token, {
                maxAge:  1000000
                
            });
            
            res.json({user : user , token : jwt.token , expiresIn : jwt.expiresIn});
    
        }) 
        console.log('logged')

}
exports.logoutUser = (req, res)=> {
    res.clearCookie('jwt');
    res.json({message : 'Success'});
}


exports.registerCourse=(req, res)=> {
    const token = req.cookies.jwt;
    if(!token) return res.status(401).json({message : 'Unauthorized'});
    try {
        const decoded = jwt.verify(token, key.secretOrKey);
        User.findOne({where:{id : decoded.id}})
            .then(user => {
                if(user.courseId == req.params.courseId) return res.json({message : 'Already registered'});
                User.update({
                    courseId: req.params.courseId
                }).then(user => {
                    res.send(user);
                })
            })
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

