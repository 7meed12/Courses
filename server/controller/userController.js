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

exports.loginUser = (req, res , next)=> {
    User.findOne({where:{username : req.body.username}})
        .then(user => {
            if(!user) return res.send({message : 'inavlid Inputs'});
            const valid = utils.validPassword(req.body.password, user.hash, user.salt);
            if(!valid) return res.send({message : 'Invalid password'});
            const jwt = utils.issueJWT(user);
            return res.send({user : user.username , token : jwt.token , expiresIn : jwt.expiresIn});
        }). catch(err => res.send({message : 'Invalid Inputs'}));

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

exports.checkUser=(req,res, next)=>{
    const token = req.body.token;
    if(token){
        jwt.verify(token, key.secretOrKey, (err, decoded) =>{ 
            if(err){
                res.message = 'Invalid token';
                    next();
                }
            else {
               User.findOne({where:{id : decoded.sub}})
                .then(user => {
                    res.send({username : user.username});
                })

            }  
        })
    }else { 
        res.message='Invalid token';
        next()}
}

