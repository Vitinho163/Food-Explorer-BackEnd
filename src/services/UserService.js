const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UserService {
  constructor(UserRepository) {
    this.userRepository = UserRepository;
  }

  async createUser({ name, email, password }) {
    if(!name || !email || !password ) {
      throw new AppError('Fill in all the fields!');
    }

    const userExists = await this.userRepository.findUserByEmail(email);

    if(userExists) {
      throw new AppError("Email already registered");
    }

    const hashedPassword = await hash(password, 12);

    const userCreated = await this.userRepository.createUser({ name, email, password: hashedPassword });

    return userCreated;
  }
}

module.exports = UserService;