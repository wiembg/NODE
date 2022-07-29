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
        }
    }