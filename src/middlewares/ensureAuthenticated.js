const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../config/auth');

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers;
  
  if(!authHeader.cookie) {
    throw new AppError("JWT token not found", 401);
  }
  
  const [, token] = authHeader.cookie.split("token=");

  try {
    const { isAdmin, sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      isAdmin,
      id: Number(user_id)
    };

    return next()
  } catch {
    throw new AppError("Token JWT invalido", 401);
  }
}

module.exports = ensureAuthenticated;