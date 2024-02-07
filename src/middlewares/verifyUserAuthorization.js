const AppError = require('../utils/AppError');

function verifyUserAuthotization(request, response, next) {
  const { isAdmin } = request.user;

  if(isAdmin == 0) {
    throw new AppError("Unauthorized user", 401);
  }

  return next();
}

module.exports = verifyUserAuthotization;