//imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var models = require('../models');
var jwtUtils = require('../utils/jwt.utils');
//routes
module.exports = {
    //functions et leurs noms
register: function(req, res) {
 console.log('register');
 var email=req.body.email;
 var username=req.body.username;
 var password=req.body.password;
 var bio=req.body.bio;

 if(email==null || username==null || password==null){

     return res.status(400).json({'error':'missing parameters'});
 }
 // si l'utilisateur existe déjà
 models.User.findOne({
     attributes :['email'],
     where:{email:email}
 })
 .then(function(userFound){
     if(!userFound){
         bcrypt.hash(password, 5, function( err, bcryptedPassword){
             var newUser = models.User.create({
                 email:email,
                 username:username,
                 password:bcryptedPassword,
                 bio:bio,
                 isAdmin:0
             })
             .then(function(newUser){
                 return res.status(201).json({
                     'userId':newUser.id
                 })
             })
             .catch(function(err){
                 return res.status(500).json({'error':'cannot add user'});
             })
         })
     }else{
         return res.status(409).json({'error':'user already exist'});
     }
 })      
    .catch(function(err){
     return res.status(500).json({'error':'unable to verify user'});
 });

},
login: function(req, res) {
    //paramètres pour se connecter 
    var email=req.body.email;
    var password=req.body.password;
    if(email==null || password==null){
        return res.status(400).json({'error':'missing parameters'});
    }
    //si l'utilisateur existe
    models.User.findOne({
        where:{email:email}
    })
    .then(function(userFound){
        if(userFound){
            bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
                if(resBycrypt){
                    return res.status(200).json({
                        'userId':userFound.id,
                        'token':jwtUtils.generateTokenForUser(userFound)
                     }); 
                    
                }else{
                    return res.status(403).json({'error':'invalid password'});
                }
            })
        }else{
            return res.status(404).json({'error':'user not exist in DB or  missing parameters'});
        }
        
    }

    )
}
}

