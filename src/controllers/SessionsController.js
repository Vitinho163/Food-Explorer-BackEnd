const AppError = require('../utils/AppError');
const UserRepository = require('../repositories/UserRepository');
const { compare } = require('bcryptjs');
const authConfig = require('../config/auth');
const { sign } = require('jsonwebtoken');

class SessionsController {
  async create(request, response ) {
    const { email, password } = request.body;

    const userRepository = new UserRepository();

    const user = await userRepository.findUserByEmail(email);

    if(!user) {
      throw new AppError("Incorrect email or password", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new AppError("Incorrect email or password", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ isAdmin: user.isAdmin }, secret, {
      subject: String(user.id),
      expiresIn
    })

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 15 * 60 * 1000
    })

    delete user.password;

    response.status(201).json({ user, token })
  }
}

module.exports = SessionsController;