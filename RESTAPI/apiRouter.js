//imports
const express = require('express');//express o zouz enfes
var userCtrl= require('./routes/userController');
var messageCtrl= require('./routes/messageController');
var likeCtrl= require('./routes/likeController');

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
        //like routes
        apiRouter.route('/messages/:messageId/like/').post(likeCtrl.likePost);//:nom de parametre
        apiRouter.route('/messages/:messageId/dislike/').post(likeCtrl.dislikePost);
    
      
        return apiRouter;
    }
)();//parenthese pour instancier le routeur
