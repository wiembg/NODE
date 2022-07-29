//Imports
var models   = require('../models');
var asyncLib = require('async');//met en place les waterfulls
var jwtUtils = require('../utils/jwt.utils');
// Routes
module.exports = {
    createMessage: function(req, res) {
      // Getting auth header
      var headerAuth  = req.headers['authorization'];
      var userId      = jwtUtils.getUserId(headerAuth);
  
      // Params
      var title   = req.body.title;
      var content = req.body.content;
  
      if (title == null || content == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
      }
  
      if (title.length <= 2|| content.length <= 4) {
        return res.status(400).json({ 'error': 'invalid parameters' });
      }
  
      asyncLib.waterfall([
        function(done) {
          models.User.findOne({//requuperer l'utilisateur   
            where: { id: userId }
          })
          .then(function(userFound) {
            done(null, userFound);//done(null,--) pour passer le resultat de la fonction precedente
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
        },
        function(userFound, done) {
          if(userFound) {
            models.Message.create({//creer le message
              title  : title,
              content: content,
              likes  : 0,
              UserId : userFound.id
            })
            .then(function(newMessage) {
              done(newMessage);
            });
          } else {
            res.status(404).json({ 'error': 'user not found' });
          }
        },
      ], function(newMessage) {
        if (newMessage) {
          return res.status(201).json(newMessage);
        } else {
          return res.status(500).json({ 'error': 'cannot post message' });
        }
      });//callback function
    },
    listMessages: function(req, res) {
      var fields  = req.query.fields;//selectionee colonnes
      var limit   = parseInt(req.query.limit);//recuperer message par segmentation//pagination
      var offset  = parseInt(req.query.offset);
      var order   = req.query.order;
  
    
      models.Message.findAll({
        order: [(order != null) ? order.split(':') : ['title', 'ASC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNaN(offset)) ? offset : null,
        include: [{//inclure plusieurs models
          model: models.User,
          attributes: [ 'username' ]
        }]
      }).then(function(messages) {
        if (messages) {
          res.status(200).json(messages);
        } else {
          res.status(404).json({ "error": "no messages found" });
        }
      }).catch(function(err) {
        console.log(err);
        res.status(500).json({ "error": "invalid fields" });
      });
    }
  }