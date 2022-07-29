    var jwt= require('jsonwebtoken');

    //exported functions
    module.exports = {
        generateTokenForUser: function(userData){
            return jwt.sign({
                userId: userData.id,
                isAdmin: userData.isAdmin
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '48h'
            })
        },
        parseAuthorization: function(authorization) {
          return (authorization != null) ? authorization.replace('Bearer ', '') : null;
        },
        getUserId: function(authorization) {
          var userId = -1;
          var token = module.exports.parseAuthorization(authorization);
          if(token != null) {
            try {//si token est valide
              var jwtToken = jwt.verify(token,process.env.JWT_SECRET);
              if(jwtToken != null)
                userId = jwtToken.userId;
            } catch(err) { }
          }
          return userId;
        }
    }