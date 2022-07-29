//imports
const express = require('express');//express o zouz enfes
var userCtrl= require('./routes/userController');

//routes

exports.router=(//object
    function(){
        var apiRouter = express.Router();
      //user routes
        apiRouter.route('/users/register/').post(userCtrl.register)  ;
        apiRouter.route('/users/login/').post(userCtrl.login);
        return apiRouter;
    }
)();//parenthese pour instancier le routeur
