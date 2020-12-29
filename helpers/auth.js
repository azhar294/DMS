const jwt = require('express-jwt');
const config = require('../config/config');
const userRepository = require('../app/repositories/user-repository.js');

function authorize(superUser = false) {
  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({secret: config.jwt.secret, algorithms: ['HS256']}),
    async (req, res, next) => {
      const user = await userRepository.findOne({_id: req.user.id});
      if (!user || (superUser && !user.superUser)) {
        // account no longer exists
        return res.status(401).json({message: 'Unauthorized'});
      }
      // authentication and authorization successful
      req.user = user;
      next();
    }
  ];
}

module.exports = authorize;

