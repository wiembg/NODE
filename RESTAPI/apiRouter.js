//imports
const express = require('express');//express o zouz enfes
var userCtrl= require('./routes/userController');
var messageCtrl= require('./routes/messageController');

//routes

exports.router=(//object
    function(){
        var apiRouter = express.Router();
      //user routes
        apiRouter.route('/users/register/').post(userCtrl.register)  ;
        apiRouter.route('/users/login/').post(userCtrl.login);
        apiRouter.route('/users/me/').get(userCtrl.getUserProfile);
        apiRouter.route('/users/me/').put(userCtrl.updateUserProfile);
   //messages routes
        apiRouter.route('/messages/new/').post(messageCtrl.createMessage);
        apiRouter.route('/messages/').get(messageCtrl.listMessages);
    
      
        return apiRouter;
    }
)();//parenthese pour instancier le routeur
